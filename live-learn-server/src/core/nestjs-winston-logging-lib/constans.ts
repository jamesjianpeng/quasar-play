import winston, { format } from 'winston';

export const ILOGGLING_OPTION = 'ILOGGLING_OPTION';

export const serviceName = 'service';

export const commonConfig = {
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.simple(),
  )
};
