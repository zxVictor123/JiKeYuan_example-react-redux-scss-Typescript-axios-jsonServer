import { request } from '../utils/axiosInstance';
import type { ArticleParams, ArticleResponse, QueryParams } from '../types/api';

// 文章相关 API
export const articleAPI = {
    // 创建文章
    create: (data: ArticleParams) => 
        request.post<ArticleResponse>('/Article', data),

    // 获取文章列表
    getList: (params: QueryParams) => 
        request.get<ArticleResponse[]>('/Article', { params }),

    // 获取文章详情
    getDetail: (id: number) => 
        request.get<ArticleResponse>(`/Article/${id}`),

    // 更新文章
    update: (id: number, data: ArticleParams) => 
        request.put<ArticleResponse>(`/Article/${id}`, data),

    // 删除文章
    delete: (id: number) => 
        request.delete(`/Article/${id}`)
}; 