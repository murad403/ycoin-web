import baseApi from "@/redux/api/api";
import {
    TConversation,
    TChatMessage,
    TPaginatedConversationsResponse,
    TPaginatedMessagesResponse,
} from "./chat.type";

const chatApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        retrieveConversationsList: builder.query<
            TPaginatedConversationsResponse,
            { search?: string; page?: number; page_size?: number } | void
        >({
            query: (params) => {
                let url = `/conversations/`;
                const queryParts: string[] = [];
                if (params?.search) {
                    queryParts.push(`search=${encodeURIComponent(params.search)}`);
                }
                if (params?.page) {
                    queryParts.push(`page=${params.page}`);
                }
                if (params?.page_size) {
                    queryParts.push(`page_size=${params.page_size}`);
                }
                if (queryParts.length > 0) {
                    url += `?${queryParts.join("&")}`;
                }
                return {
                    url,
                    method: "GET",
                };
            },
            transformResponse: (
                response: TConversation[] | TPaginatedConversationsResponse
            ): TPaginatedConversationsResponse => {
                if (Array.isArray(response)) {
                    return { count: response.length, next: null, previous: null, results: response };
                }
                return {
                    count: response?.count || 0,
                    next: response?.next || null,
                    previous: response?.previous || null,
                    results: response?.results || [],
                };
            },
            providesTags: ["Chat"],
        }),
        renameTitle: builder.mutation<TConversation, { id: string; title: string }>({
            query: ({ id, title }) => ({
                url: `/conversations/${id}/`,
                method: "PATCH",
                body: { title },
            }),
            invalidatesTags: ["Chat"],
        }),
        deleteConversation: builder.mutation<void, string>({
            query: (id) => ({
                url: `/conversations/${id}/`,
                method: "DELETE",
            }),
            invalidatesTags: ["Chat"],
        }),
        retrieveMessages: builder.query<
            TPaginatedMessagesResponse,
            string | { id: string; cursor?: string | null }
        >({
            query: (arg) => {
                const id = typeof arg === "string" ? arg : arg.id;
                const cursor = typeof arg === "string" ? null : arg.cursor;
                let url = `/messages/?conversation_id=${id}`;
                if (cursor) {
                    url += `&cursor=${encodeURIComponent(cursor)}`;
                }
                return {
                    url,
                    method: "GET",
                };
            },
            transformResponse: (
                response: TChatMessage[] | TPaginatedMessagesResponse
            ): TPaginatedMessagesResponse => {
                if (Array.isArray(response)) {
                    const sorted = [...response].sort(
                        (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
                    );
                    return { next: null, previous: null, results: sorted };
                }
                const list = response?.results || [];
                const sorted = [...list].sort(
                    (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
                );
                return {
                    next: response?.next || null,
                    previous: response?.previous || null,
                    results: sorted,
                };
            },
            providesTags: ["Chat"],
        }),
    }),
});

export const {
    useRetrieveConversationsListQuery,
    useLazyRetrieveConversationsListQuery,
    useRenameTitleMutation,
    useDeleteConversationMutation,
    useRetrieveMessagesQuery,
    useLazyRetrieveMessagesQuery,
} = chatApi;
