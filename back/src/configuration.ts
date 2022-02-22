/* eslint-disable */
export default () => {
  return {
    redis: {
      url: process.env.REDIS_URL ?? ''
    }
  }
}
