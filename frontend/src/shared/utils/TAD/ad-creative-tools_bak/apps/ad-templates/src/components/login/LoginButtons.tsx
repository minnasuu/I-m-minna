import React from "react";
import { LandButton } from "@suminhan/land-design";
type Props = {
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
}
const LoginButtons: React.FC<Props> = ({
  onLoginClick,
  onRegisterClick
}) => <div className='flex items-center gap-4'>
    <LandButton type={'fill'} onClick={onLoginClick} style={{ display: 'flex' }}>登录</LandButton>
    <LandButton type={'background'} style={{ display: 'flex' }} onClick={onRegisterClick}>注册</LandButton>
  </div>
export default LoginButtons;