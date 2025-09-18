import { apiSlice } from "../apiSlice";

const chaptersApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getChapters: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/chapters",
                    params
                }
            }
        }),
        getOneChapter: builder.query({
            query: (queries) => {
                const params = queries
                return {
                    url: "/chapters/" + params.id,
                    params
                }
            }
        }),
        createChapter: builder.mutation({
            query: (data) => {
                return {
                    url: '/chapters',
                    method: 'POST',
                    body: data
                }
            }
        }),
        addToChapter: builder.mutation({
            query: (data) => {
                return {
                    url: '/chapters/push',
                    method: 'PATCH',
                    body: data
                }
            }
        }),
        updateChapter: builder.mutation({
            query: (data) => {
                return {
                    url: '/chapters/' + data._id,
                    method: 'put',
                    body: data
                }
            }
        }),
        deleteChapter: builder.mutation({
            query: (data) => {
                return {
                    url: '/chapters/' + data._id,
                    method: 'delete',
                }
            }
        }),
        deleteManyChapters: builder.mutation({
            query: (data) => {
                return {
                    url: '/chapters',
                    method: 'delete',
                    params: data,
                    body: data
                }
            }
        }),
    })
})


export const {
    useLazyGetChaptersQuery, useCreateChapterMutation, useUpdateChapterMutation, useDeleteChapterMutation,
    useAddToChapterMutation
} = chaptersApi