import { NextResponse, NextRequest } from 'next/server';
import { AppError } from './errors';

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  meta?: {
    requestId?: string;
    timestamp: string;
    pagination?: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

import { z } from 'zod';
import { ValidationError } from './errors';

export class ApiResponseHandler {
  static async handle<T>(
    req: NextRequest,
    handler: () => Promise<T>,
    options?: { status?: number; successMessage?: string }
  ) {
    try {
      const data = await handler();
      if (options?.status === 201) {
        return ApiResponseHandler.created(data, options?.successMessage);
      }
      return ApiResponseHandler.success(data, options?.successMessage);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return ApiResponseHandler.error(new ValidationError('Validation failed', error.issues));
      }
      return ApiResponseHandler.error(error);
    }
  }
  static success<T>(
    data: T,
    message?: string,
    meta?: Omit<ApiResponse['meta'], 'timestamp'>
  ) {
    const response: ApiResponse<T> = {
      success: true,
      message,
      data,
      meta: {
        ...meta,
        timestamp: new Date().toISOString(),
      },
    };
    return NextResponse.json(response, { status: 200 });
  }

  static created<T>(
    data: T,
    message = 'Resource created successfully',
    meta?: Omit<ApiResponse['meta'], 'timestamp'>
  ) {
    const response: ApiResponse<T> = {
      success: true,
      message,
      data,
      meta: {
        ...meta,
        timestamp: new Date().toISOString(),
      },
    };
    return NextResponse.json(response, { status: 201 });
  }

  static error(error: unknown, defaultMessage = 'An unexpected error occurred') {
    if (error instanceof AppError) {
      const response: ApiResponse = {
        success: false,
        error: {
          code: error.code,
          message: error.message,
          details: error.details,
        },
        meta: {
          requestId: error.requestId,
          timestamp: error.timestamp,
        },
      };
      return NextResponse.json(response, { status: error.statusCode });
    }

    // Handle generic/unknown errors
    console.error('[API Error]:', error);
    const isDev = process.env.NODE_ENV === 'development';
    const message = error instanceof Error ? error.message : defaultMessage;
    
    const response: ApiResponse = {
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: isDev ? message : defaultMessage,
        details: isDev ? error : undefined,
      },
      meta: {
        timestamp: new Date().toISOString(),
      },
    };

    return NextResponse.json(response, { status: 500 });
  }
}
