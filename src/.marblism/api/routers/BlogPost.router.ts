/* eslint-disable */
import { type RouterFactory, type ProcBuilder, type BaseConfig, db } from ".";
import * as _Schema from '@zenstackhq/runtime/zod/input';
const $Schema: typeof _Schema = (_Schema as any).default ?? _Schema;
import { checkRead, checkMutate } from '../helper';
import type { Prisma } from '@prisma/client';
import type { UseTRPCMutationOptions, UseTRPCMutationResult, UseTRPCQueryOptions, UseTRPCQueryResult, UseTRPCInfiniteQueryOptions, UseTRPCInfiniteQueryResult } from '@trpc/react-query/shared';
import type { TRPCClientErrorLike } from '@trpc/client';
import type { AnyRouter } from '@trpc/server';

export default function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({

        createMany: procedure.input($Schema.BlogPostInputSchema.createMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).blogPost.createMany(input as any))),

        create: procedure.input($Schema.BlogPostInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).blogPost.create(input as any))),

        deleteMany: procedure.input($Schema.BlogPostInputSchema.deleteMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).blogPost.deleteMany(input as any))),

        delete: procedure.input($Schema.BlogPostInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).blogPost.delete(input as any))),

        findFirst: procedure.input($Schema.BlogPostInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).blogPost.findFirst(input as any))),

        findMany: procedure.input($Schema.BlogPostInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).blogPost.findMany(input as any))),

        findUnique: procedure.input($Schema.BlogPostInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).blogPost.findUnique(input as any))),

        updateMany: procedure.input($Schema.BlogPostInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).blogPost.updateMany(input as any))),

        update: procedure.input($Schema.BlogPostInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).blogPost.update(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.BlogPostCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.BlogPostCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.BlogPostCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.BlogPostCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.BlogPostCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.BlogPostCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BlogPostGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BlogPostGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.BlogPostCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.BlogPostCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BlogPostGetPayload<T>, Context>) => Promise<Prisma.BlogPostGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.BlogPostDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.BlogPostDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.BlogPostDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.BlogPostDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.BlogPostDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.BlogPostDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BlogPostGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BlogPostGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.BlogPostDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.BlogPostDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BlogPostGetPayload<T>, Context>) => Promise<Prisma.BlogPostGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.BlogPostFindFirstArgs, TData = Prisma.BlogPostGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.BlogPostFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.BlogPostGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.BlogPostFindFirstArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.BlogPostFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.BlogPostGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.BlogPostGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.BlogPostFindManyArgs, TData = Array<Prisma.BlogPostGetPayload<T>>>(
            input: Prisma.SelectSubset<T, Prisma.BlogPostFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.BlogPostGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.BlogPostFindManyArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.BlogPostFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.BlogPostGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.BlogPostGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.BlogPostFindUniqueArgs, TData = Prisma.BlogPostGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.BlogPostFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.BlogPostGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.BlogPostFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.BlogPostFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.BlogPostGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.BlogPostGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.BlogPostUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.BlogPostUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.BlogPostUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.BlogPostUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.BlogPostUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.BlogPostUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BlogPostGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BlogPostGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.BlogPostUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.BlogPostUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BlogPostGetPayload<T>, Context>) => Promise<Prisma.BlogPostGetPayload<T>>
            };

    };
}
