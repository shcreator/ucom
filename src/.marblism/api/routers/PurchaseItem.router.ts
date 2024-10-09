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

        createMany: procedure.input($Schema.PurchaseItemInputSchema.createMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).purchaseItem.createMany(input as any))),

        create: procedure.input($Schema.PurchaseItemInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).purchaseItem.create(input as any))),

        deleteMany: procedure.input($Schema.PurchaseItemInputSchema.deleteMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).purchaseItem.deleteMany(input as any))),

        delete: procedure.input($Schema.PurchaseItemInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).purchaseItem.delete(input as any))),

        findFirst: procedure.input($Schema.PurchaseItemInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).purchaseItem.findFirst(input as any))),

        findMany: procedure.input($Schema.PurchaseItemInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).purchaseItem.findMany(input as any))),

        findUnique: procedure.input($Schema.PurchaseItemInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).purchaseItem.findUnique(input as any))),

        updateMany: procedure.input($Schema.PurchaseItemInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).purchaseItem.updateMany(input as any))),

        update: procedure.input($Schema.PurchaseItemInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).purchaseItem.update(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.PurchaseItemCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PurchaseItemCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PurchaseItemCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PurchaseItemCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.PurchaseItemCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PurchaseItemCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.PurchaseItemGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.PurchaseItemGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PurchaseItemCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PurchaseItemCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.PurchaseItemGetPayload<T>, Context>) => Promise<Prisma.PurchaseItemGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.PurchaseItemDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PurchaseItemDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PurchaseItemDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PurchaseItemDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.PurchaseItemDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PurchaseItemDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.PurchaseItemGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.PurchaseItemGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PurchaseItemDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PurchaseItemDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.PurchaseItemGetPayload<T>, Context>) => Promise<Prisma.PurchaseItemGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.PurchaseItemFindFirstArgs, TData = Prisma.PurchaseItemGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.PurchaseItemFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.PurchaseItemGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.PurchaseItemFindFirstArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.PurchaseItemFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.PurchaseItemGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.PurchaseItemGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.PurchaseItemFindManyArgs, TData = Array<Prisma.PurchaseItemGetPayload<T>>>(
            input: Prisma.SelectSubset<T, Prisma.PurchaseItemFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.PurchaseItemGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.PurchaseItemFindManyArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.PurchaseItemFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.PurchaseItemGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.PurchaseItemGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.PurchaseItemFindUniqueArgs, TData = Prisma.PurchaseItemGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.PurchaseItemFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.PurchaseItemGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.PurchaseItemFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.PurchaseItemFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.PurchaseItemGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.PurchaseItemGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.PurchaseItemUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PurchaseItemUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PurchaseItemUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PurchaseItemUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.PurchaseItemUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PurchaseItemUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.PurchaseItemGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.PurchaseItemGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PurchaseItemUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PurchaseItemUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.PurchaseItemGetPayload<T>, Context>) => Promise<Prisma.PurchaseItemGetPayload<T>>
            };

    };
}
