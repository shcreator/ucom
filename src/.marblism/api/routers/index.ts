/* eslint-disable */
import type { unsetMarker, AnyRouter, AnyRootConfig, CreateRouterInner, Procedure, ProcedureBuilder, ProcedureParams, ProcedureRouterRecord, ProcedureType } from "@trpc/server";
import type { PrismaClient } from "@prisma/client";
import createCategoryRouter from "./Category.router";
import createTemplateRouter from "./Template.router";
import createTransactionRouter from "./Transaction.router";
import createPurchaseItemRouter from "./PurchaseItem.router";
import createCartItemRouter from "./CartItem.router";
import createReviewRouter from "./Review.router";
import createBlogPostRouter from "./BlogPost.router";
import createUserRouter from "./User.router";
import createPushNotificationRouter from "./PushNotification.router";
import createAccountRouter from "./Account.router";
import createSessionRouter from "./Session.router";
import { ClientType as CategoryClientType } from "./Category.router";
import { ClientType as TemplateClientType } from "./Template.router";
import { ClientType as TransactionClientType } from "./Transaction.router";
import { ClientType as PurchaseItemClientType } from "./PurchaseItem.router";
import { ClientType as CartItemClientType } from "./CartItem.router";
import { ClientType as ReviewClientType } from "./Review.router";
import { ClientType as BlogPostClientType } from "./BlogPost.router";
import { ClientType as UserClientType } from "./User.router";
import { ClientType as PushNotificationClientType } from "./PushNotification.router";
import { ClientType as AccountClientType } from "./Account.router";
import { ClientType as SessionClientType } from "./Session.router";

export type BaseConfig = AnyRootConfig;

export type RouterFactory<Config extends BaseConfig> = <
    ProcRouterRecord extends ProcedureRouterRecord
>(
    procedures: ProcRouterRecord
) => CreateRouterInner<Config, ProcRouterRecord>;

export type UnsetMarker = typeof unsetMarker;

export type ProcBuilder<Config extends BaseConfig> = ProcedureBuilder<
    ProcedureParams<Config, any, any, any, UnsetMarker, UnsetMarker, any>
>;

export function db(ctx: any) {
    if (!ctx.prisma) {
        throw new Error('Missing "prisma" field in trpc context');
    }
    return ctx.prisma as PrismaClient;
}

export function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({
        category: createCategoryRouter(router, procedure),
        template: createTemplateRouter(router, procedure),
        transaction: createTransactionRouter(router, procedure),
        purchaseItem: createPurchaseItemRouter(router, procedure),
        cartItem: createCartItemRouter(router, procedure),
        review: createReviewRouter(router, procedure),
        blogPost: createBlogPostRouter(router, procedure),
        user: createUserRouter(router, procedure),
        pushNotification: createPushNotificationRouter(router, procedure),
        account: createAccountRouter(router, procedure),
        session: createSessionRouter(router, procedure),
    }
    );
}

export interface ClientType<AppRouter extends AnyRouter> {
    category: CategoryClientType<AppRouter>;
    template: TemplateClientType<AppRouter>;
    transaction: TransactionClientType<AppRouter>;
    purchaseItem: PurchaseItemClientType<AppRouter>;
    cartItem: CartItemClientType<AppRouter>;
    review: ReviewClientType<AppRouter>;
    blogPost: BlogPostClientType<AppRouter>;
    user: UserClientType<AppRouter>;
    pushNotification: PushNotificationClientType<AppRouter>;
    account: AccountClientType<AppRouter>;
    session: SessionClientType<AppRouter>;
}
