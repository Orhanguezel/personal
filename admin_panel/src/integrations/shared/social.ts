export type SocialPostStatus = 'draft' | 'queued' | 'posting' | 'posted' | 'failed' | 'canceled';

export type SocialPlatform = 'linkedin' | 'facebook' | 'instagram' | 'youtube';

export type SocialPost = {
  id: string;
  platform: SocialPlatform;
  source_type: string | null;
  source_id: string | null;
  content: string | null;
  media_path: string | null;
  link: string | null;
  status: SocialPostStatus;
  scheduled_at: string | null;
  posted_at: string | null;
  external_id: string | null;
  retry_count: number;
  error_message: string | null;
  locked_at: string | null;
  created_at: string;
  updated_at: string;
};

export type LinkedInStatus = {
  connected: boolean;
  enabled: boolean;
  token_expires_at: string | null;
  org_urn_configured: boolean;
};

export type SocialPostListParams = {
  status?: SocialPostStatus;
  limit?: number;
  offset?: number;
};

export type SocialPostPatch = {
  content?: string | null;
  link?: string | null;
  scheduled_at?: string | null;
};
