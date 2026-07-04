import { NextResponse } from 'next/server';
import { AppError } from './errors';

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
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

export class ApiResponseHandler {
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
