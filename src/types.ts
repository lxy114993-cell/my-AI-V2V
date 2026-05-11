// 定义视图类型，包括首页、图片生成、视频生成、历史记录、公告、更新日志、模型、个人资料、定价、设置和注册页面
export type ViewType = 'home' | 'image-gen' | 'video-gen' | 'history' | 'announcements' | 'changelog' | 'models' | 'profile' | 'pricing' | 'settings';

// 定义导航项接口
export interface NavItem {
  id: ViewType;
  label: string;
  icon: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'image-gen', label: '图片生成', icon: 'Sparkles' },
  { id: 'video-gen', label: '视频生成', icon: 'Video' },
  { id: 'history', label: '历史记录', icon: 'History' },
];
