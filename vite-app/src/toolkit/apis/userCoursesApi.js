import { apiSlice } from "../apiSlice";

const userCoursesApi = apiSlice.injectEndpoints({
    endpoints: builder => ({

        getCourseSubscriptions: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/subscriptions/courses",
                    params
                }
            }
        }),
        analysisSubscriptions: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/subscriptions/analysis",
                    params
                }
            }
        }),
        createSubscription: builder.mutation({
            query: (data) => {
                return {
                    url: "/subscriptions/courses",
                    method: 'POST',
                    body: data
                }
            }
        }),
        updateSubscription: builder.mutation({
            query: (data) => {
                return {
                    url: "/subscriptions/courses/" + data.id,
                    method: 'put',
                    body: data
                }
            }
        }),
        updateSubscriptionChapterIndex: builder.mutation({
            query: (data) => {
                return {
                    url: "/subscriptions/courses/" + data.id + '/chapters/' + data.chapter,
                    method: 'put',
                    body: data
                }
            }
        }),
        deleteSubscription: builder.mutation({
            query: (data) => ({
                url: "/subscriptions/courses/" + data._id,
                method: 'DELETE',
                body: data

            })
        }),

    })
})

export const { useLazyGetCourseSubscriptionsQuery, useLazyAnalysisSubscriptionsQuery,
    useCreateSubscriptionMutation, useUpdateSubscriptionMutation, useUpdateSubscriptionChapterIndexMutation,
    useDeleteSubscriptionMutation } = userCoursesApi