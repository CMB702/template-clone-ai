export const config = {
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  database: {
    url: process.env.DATABASE_URL || '',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secret',
    expiry: process.env.JWT_EXPIRY || '7d',
  },
  ai: {
    claudeApiKey: process.env.CLAUDE_API_KEY || '',
    googleVisionKey: process.env.GOOGLE_VISION_API_KEY || '',
    openaiKey: process.env.OPENAI_API_KEY || '',
  },
  aws: {
    s3Bucket: process.env.AWS_S3_BUCKET || '',
    region: process.env.AWS_REGION || 'us-east-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
}

export default config
