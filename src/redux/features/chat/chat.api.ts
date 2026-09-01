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
    useRetrieveMessagesQuery,
} = chatApi;