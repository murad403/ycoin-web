import baseApi from "@/redux/api/api";
import { TConversation, TChatMessage } from "./chat.type";

const chatApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        retrieveConversationsList: builder.query<TConversation[], void>({
            query: () => ({
                url: `/conversations/`,
                method: "GET",
            }),
            providesTags: ["Chat"]
        }),
        renameTitle: builder.mutation<TConversation, { id: string; title: string }>({
            query: ({ id, title }) => ({
                url: `/conversations/${id}/`,
                method: "PATCH",
                body: { title },
            }),
            invalidatesTags: ["Chat"]
        }),
        deleteConversation: builder.mutation<void, string>({
            query: (id) => ({
                url: `/conversations/${id}/`,
                method: "DELETE",
            }),
            invalidatesTags: ["Chat"]
        }),
        retrieveMessages: builder.query<TChatMessage[], string>({
            query: (id) => ({
                url: `/messages/?conversation_id=${id}`,
                method: "GET",
            }),
            providesTags: ["Chat"]
        }),
    }),
});

export const {
    useRetrieveConversationsListQuery,
    useRenameTitleMutation,
    useDeleteConversationMutation,
    useRetrieveMessagesQuery,
} = chatApi;
