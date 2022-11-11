import SuperTokens from 'supertokens-auth-react'
import { frontendConfig, FrontendConfigProps } from '../config/frontend'

export const initFrontend = (config?: FrontendConfigProps) => {
  if (typeof window !== 'undefined') {
    // we only want to call this init function on the frontend, so we check typeof window !== 'undefined'
    SuperTokens.init(frontendConfig(config))
  }
}
