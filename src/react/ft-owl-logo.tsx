import { createComponent } from '@lit/react'
import React from 'react'
import { FtOwlLogo as FtOwlLogoElement } from '../ft-owl-logo'

export const FtOwlLogo = createComponent({
  react: React,
  tagName: 'ft-owl-logo',
  elementClass: FtOwlLogoElement,
})
