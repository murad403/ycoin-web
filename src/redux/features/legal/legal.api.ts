import baseApi from "@/redux/api/api";
import { TLegalDocumentResponse } from "./legal.type";

const legalApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        retrievePrivacyPolicy: builder.query<TLegalDocumentResponse, void>({
            query: () => ({
                url: `/privacy/`,
                method: "GET",
            }),
        }),
        retrieveTermsAndConditions: builder.query<TLegalDocumentResponse, void>({
            query: () => ({
                url: `/terms/`,
                method: "GET",
            }),
        }),
    }),
});

export const {
    useRetrievePrivacyPolicyQuery,
    useRetrieveTermsAndConditionsQuery,
} = legalApi;

