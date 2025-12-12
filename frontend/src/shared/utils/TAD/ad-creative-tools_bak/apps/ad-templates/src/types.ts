export interface ComponentItem {
  id: string;
  name: string;
  ratio: string;
  desc?: string;
  html?: string;
  css?: string;
  js?: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  width?: string;
  height?: string;
  instance_templates?: ComponentInstance[];
}

export interface ComponentInstance {
  id: string;
  name: string;
  ratio: string;
  desc?: string;
  html?: string;
  css?: string;
  js?: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  width?: string;
  height?: string;
}