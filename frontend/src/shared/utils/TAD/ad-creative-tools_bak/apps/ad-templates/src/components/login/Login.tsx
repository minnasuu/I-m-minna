import React, { useState } from "react";
import { LandAlert, LandDialog, LandInput, LandLoading, LandTitle, type DialogProps } from "@suminhan/land-design";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

type Props = {
  onLogined?: () => void;
} & DialogProps;

const Login: React.FC<Props> = ({
  onLogined,
  ...restProps
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const login = async () => {
    setError('');
    setLoginLoading(true);

    const result = await signIn(email, password);

    if (result.success) {
      onLogined?.();
      // 重定向到原来要访问的页面，如果没有则重定向到首页
      const from = (location.state as any)?.from?.pathname || '/';
      navigate(from, { replace: true });
    } else {
      setError(result.error || '登录失败');
    }

    setLoginLoading(false);
  };
  return (<LandDialog
    mask
    size={'small'}
    onSubmit={() => {
      setLoginLoading(true);
      login();
    }}
    submitLabel={'提交'}
    headerLeftComponent={<LandTitle type={'h2'} title={'登录'} />}
    {...restProps}
  >
    {loginLoading ? <div style={{ height: '84px' }} className={'flex column both-center gap-4 fs-14 color-gray-4'}>
      <LandLoading />
      登录中...
    </div> : <div className={`flex flex-col gap-3 ${loginLoading ? 'events-none' : ''}`}>
      <LandInput type={'border'} prefix={'邮箱：'} name={'email'} onChange={val => {
        setError('');
        setEmail(val)
      }}  />
      <LandInput type={'border'} inputType={'password'} prefix={'密码：'} name={'password'} onChange={val => {
        setError('');
        setPassword(val)
      }}  />
      {error && <LandAlert type={'fail'} title={error} />}
    </div>}
  </LandDialog>)
}
export default Login;
