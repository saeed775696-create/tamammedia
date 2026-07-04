export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogMeta {
  requestId?: string;
  [key: string]: unknown;
}

class Logger {
  private formatMessage(level: LogLevel, message: string, meta?: LogMeta) {
    const timestamp = new Date().toISOString();
    return JSON.stringify({
      timestamp,
      level: level.toUpperCase(),
      message,
      ...meta,
    });
  }

  debug(message: string, meta?: LogMeta) {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(this.formatMessage('debug', message, meta));
    }
  }

  info(message: string, meta?: LogMeta) {
    console.info(this.formatMessage('info', message, meta));
  }

  warn(message: string, meta?: LogMeta) {
    console.warn(this.formatMessage('warn', message, meta));
  }

  error(message: string, error?: unknown, meta?: LogMeta) {
    const errorDetails = error instanceof Error ? {
      name: error.name,
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    } : error;

    console.error(this.formatMessage('error', message, { ...meta, error: errorDetails }));
  }
}

export const logger = new Logger();
