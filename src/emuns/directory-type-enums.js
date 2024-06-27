import googleIcon from '@/assets/google.png'
import zerosslIcon from '@/assets/zerossl.png'
import letsEncryptIcon from '@/assets/lets-encrypt.png'

export const DirectoryTypeEnum = {
  LETS_ENCRYPT: 'letsencrypt',
  LETS_ENCRYPT_STAGING: 'letsencrypt-staging',
  ZERO_SSL: 'zerossl',
  GOOGLE: 'google',
}

// 证书签发提供商
export const DIRECTORY_URL_OPTIONS = [
  {
    label: "Let's Encrypt",
    value: DirectoryTypeEnum.LETS_ENCRYPT,
    icon: letsEncryptIcon,
  },
//   {
//     label: 'LetsEncrypt-Staging',
//     value: DirectoryTypeEnum.LETS_ENCRYPT_STAGING,
//     icon: letsEncryptIcon,
//   },
  {
    label: 'ZeroSSL',
    value: DirectoryTypeEnum.ZERO_SSL,
    icon: zerosslIcon,
    disabled: true,
  },
  {
    label: 'Google',
    value: DirectoryTypeEnum.GOOGLE,
    icon: googleIcon,
    disabled: true,
  },
]
