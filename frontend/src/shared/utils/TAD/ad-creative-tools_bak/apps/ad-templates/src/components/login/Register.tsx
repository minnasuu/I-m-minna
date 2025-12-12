import React, { useState } from "react";
import { LandAlert, LandDialog, LandInput, LandRadioGroup, LandTitle, LandUploader, type DialogProps } from "@suminhan/land-design";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";


const Register: React.FC<DialogProps> = ({
  ...restProps
}) => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const registerSexData = [
    { key: 'male', label: '男' },
    { key: 'female', label: '女' },
    { key: '', label: '神秘' },
  ]
  const [avatar, setAvatar] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [sex, setSex] = useState<string>('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authing, setAuthing] = useState(false);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const register = async () => {
    setError('');
    setLoading(true);

    try {
      // 准备用户数据
      const userData = {
        avatar_url: avatar,
        username,
        sex: String(sex),
        is_official: email === 'minhansu508@gmail.com',
      };

      // 注册用户
      const result = await signUp(email, password, userData);

      if (result.success) {
        setAuthing(true);
        // 3秒后跳转到首页
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } else {
        setError(result.error || '注册失败');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setError('注册过程中发生错误');
    } finally {
      setLoading(false);
    }
  };
  return (<LandDialog
    mask
    size={'small'}
    onSubmit={() => register()}
    submitLabel={loading ? '注册中...' : '提交'}
    headerLeftComponent={<LandTitle type={'h2'} title={'注册'} />}
    {...restProps}
  >
    <div className={'relative flex flex-col gap-3'}>
      <LandUploader
        width={'64px'}
        height={'64px'}
        className={'mx-auto radius-100 mb-4'}
        onUpload={url => setAvatar(url)}
        style={{ padding: '0px', borderRadius: '100%', overflow: 'hidden' }}
      >
        {avatar && <img width={'100%'} height={'100%'} src={avatar} style={{ objectFit: 'cover' }} />}
      </LandUploader>
      <LandInput
        type={'background'}
        width={'100%'}
        prefix={'昵称：'}
        onChange={val => {
          setError('');
          setUsername(val);
        }}
        autocomplete
      />
      <LandRadioGroup
        data={registerSexData}
        checked={sex}
        onChange={key => {
          setError('');
          setSex(key);
        }}
      />
      <LandInput
        type={'background'}
        prefix={'邮箱：'}
        onChange={val => {
          setError('');
          setEmail(val);
        }}
        autocomplete
      />
      <LandInput
        style={{ flex: 1 }}
        type={'background'}
        inputType={'password'}
        width={'100%'}
        prefix={'密码：'}
        onChange={val => {
          setError('');
          setPassword(val);
        }}
        autocomplete
      />
      {error && <LandAlert type={'fail'} title={error} />}
      <div className={`absolute w-full h-full top-0 left-0 flex items-center justify-center z-1 ${authing ? '' : 'opacity-0 pointer-events-none'}`} style={{ backgroundColor: 'rgba(255,255,255,0.8)' }}>
        <LandAlert title={'注册信息提交成功，请前往邮箱进行验证。'} />
      </div>
    </div>
  </LandDialog>)
}
export default Register;
