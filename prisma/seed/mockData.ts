import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const splitSql = (sql: string) => {
  return sql.split(';').filter(content => content.trim() !== '')
}

async function main() {
  const sql = `

INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password", "walletBalance") VALUES ('9f9f89e4-74cd-4f90-a2ce-5056817df748', '1Kaia89@gmail.com', 'Eve Davis', 'https://i.imgur.com/YfJQV5z.png?id=3', 'inv12345', true, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC', 832);
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password", "walletBalance") VALUES ('18b974ff-b022-42dd-a9c8-a8967a5813d3', '11Aurelio.Armstrong@hotmail.com', 'Eve Davis', 'https://i.imgur.com/YfJQV5z.png?id=13', 'inv67890', true, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC', 793);
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password", "walletBalance") VALUES ('db4a7bbe-ef91-4f96-82e9-04a1ec41869e', '21Jayce41@yahoo.com', 'Eve Davis', 'https://i.imgur.com/YfJQV5z.png?id=23', 'inv67890', false, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC', 267);
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password", "walletBalance") VALUES ('4c14beaa-1695-4114-83d0-3b2a120c185d', '41Austin.Donnelly@hotmail.com', 'Eve Davis', 'https://i.imgur.com/YfJQV5z.png?id=43', 'inv67890', false, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC', 256);
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password", "walletBalance") VALUES ('a8cb1eca-201c-400a-a9e9-0e73f757bc33', '51Orrin.Larson76@gmail.com', 'Dave Wilson', 'https://i.imgur.com/YfJQV5z.png?id=53', 'inv12345', true, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC', 493);
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password", "walletBalance") VALUES ('81627b4d-8470-47f0-a4a6-f60a0cd97873', '61Raoul.Hegmann67@yahoo.com', 'Eve Davis', 'https://i.imgur.com/YfJQV5z.png?id=63', 'inv11223', false, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC', 464);
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password", "walletBalance") VALUES ('6a0ecad5-d236-4adb-8bf1-3ff0f0624a46', '71Bonnie2@yahoo.com', 'Charlie Brown', 'https://i.imgur.com/YfJQV5z.png?id=73', 'inv78901', true, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC', 751);
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password", "walletBalance") VALUES ('2c558c4b-9a89-4354-9649-731edd082c06', '81Tanya_Jerde@hotmail.com', 'Dave Wilson', 'https://i.imgur.com/YfJQV5z.png?id=83', 'inv12345', true, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC', 750);
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "emailVerified", "status", "globalRole", "password", "walletBalance") VALUES ('2f9eaeee-b72c-4812-879e-7cb56707ec31', '91Kimberly.Hauck@hotmail.com', 'Alice Johnson', 'https://i.imgur.com/YfJQV5z.png?id=93', 'inv67890', true, 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC', 972);

INSERT INTO "PushNotification" ("id", "endpoint", "subscription", "userId") VALUES ('ca8a9ac6-5d31-4e55-9ac8-33b7d5ffd620', 'httpsexample.compushendpoint2', 'subscription_data_3', 'a8cb1eca-201c-400a-a9e9-0e73f757bc33');
INSERT INTO "PushNotification" ("id", "endpoint", "subscription", "userId") VALUES ('e433a7e8-25e3-48e8-aad4-c0d6eb1f981d', 'httpsexample.compushendpoint4', 'subscription_data_1', '2c558c4b-9a89-4354-9649-731edd082c06');
INSERT INTO "PushNotification" ("id", "endpoint", "subscription", "userId") VALUES ('9f644ecb-37fc-4c1a-b0f7-c21d36d1550c', 'httpsexample.compushendpoint3', 'subscription_data_3', 'db4a7bbe-ef91-4f96-82e9-04a1ec41869e');
INSERT INTO "PushNotification" ("id", "endpoint", "subscription", "userId") VALUES ('14bc8ece-df0a-4c54-b60c-015e25d5245d', 'httpsexample.compushendpoint1', 'subscription_data_3', '4c14beaa-1695-4114-83d0-3b2a120c185d');
INSERT INTO "PushNotification" ("id", "endpoint", "subscription", "userId") VALUES ('d56482cd-54ba-4b55-b50f-b0cf09fac731', 'httpsexample.compushendpoint2', 'subscription_data_5', '2f9eaeee-b72c-4812-879e-7cb56707ec31');
INSERT INTO "PushNotification" ("id", "endpoint", "subscription", "userId") VALUES ('d06edf5a-99fb-489a-992e-02996662820c', 'httpsexample.compushendpoint2', 'subscription_data_3', 'db4a7bbe-ef91-4f96-82e9-04a1ec41869e');
INSERT INTO "PushNotification" ("id", "endpoint", "subscription", "userId") VALUES ('e3378542-db27-485b-bab7-9627ff6ab563', 'httpsexample.compushendpoint5', 'subscription_data_2', 'a8cb1eca-201c-400a-a9e9-0e73f757bc33');
INSERT INTO "PushNotification" ("id", "endpoint", "subscription", "userId") VALUES ('d87b0a40-1e7a-4afc-887b-1180b22ee0be', 'httpsexample.compushendpoint4', 'subscription_data_5', '81627b4d-8470-47f0-a4a6-f60a0cd97873');
INSERT INTO "PushNotification" ("id", "endpoint", "subscription", "userId") VALUES ('fa6cae77-f666-461e-97e8-9d3f5d531a61', 'httpsexample.compushendpoint5', 'subscription_data_4', '9f9f89e4-74cd-4f90-a2ce-5056817df748');
INSERT INTO "PushNotification" ("id", "endpoint", "subscription", "userId") VALUES ('d3997b99-6c6e-43ee-a600-9bc1d366a633', 'httpsexample.compushendpoint4', 'subscription_data_2', '2f9eaeee-b72c-4812-879e-7cb56707ec31');

INSERT INTO "Category" ("id", "name", "description") VALUES ('0ebeb703-195c-47ed-b2da-14d54bd4ab3d', 'Ecommerce', 'Capture moments with our photographyfocused themes.');
INSERT INTO "Category" ("id", "name", "description") VALUES ('3dc0cf11-e7f4-4f78-88e7-b03a7dc44559', 'Photography', 'Templates designed for corporate and business websites.');
INSERT INTO "Category" ("id", "name", "description") VALUES ('35c587a6-1112-46ee-9427-bbd0dcf61255', 'Portfolio', 'Engage your audience with our customizable blog templates.');
INSERT INTO "Category" ("id", "name", "description") VALUES ('9dc38c7c-f999-4b3e-9b56-727c6840763e', 'Ecommerce', 'Build your online store with our ecommerce themes.');
INSERT INTO "Category" ("id", "name", "description") VALUES ('e052bcde-0d40-4d8a-88a8-42e83daef7aa', 'Business', 'Templates designed for corporate and business websites.');
INSERT INTO "Category" ("id", "name", "description") VALUES ('6b77bb36-2e46-4baa-b369-60e8630eb293', 'Ecommerce', 'Build your online store with our ecommerce themes.');
INSERT INTO "Category" ("id", "name", "description") VALUES ('ae9d1596-edc2-437b-88cb-838a4a83d3a1', 'Ecommerce', 'Build your online store with our ecommerce themes.');
INSERT INTO "Category" ("id", "name", "description") VALUES ('2af6bcda-6e3e-4c54-99e0-421f34a73c16', 'Portfolio', 'Showcase your work with these stylish portfolio templates.');
INSERT INTO "Category" ("id", "name", "description") VALUES ('ad1df181-a1ad-4da7-b2c8-6cf96e2aca5e', 'Ecommerce', 'Templates designed for corporate and business websites.');
INSERT INTO "Category" ("id", "name", "description") VALUES ('32aabc24-621b-48d0-b93e-203de1612361', 'Blog', 'Engage your audience with our customizable blog templates.');

INSERT INTO "Template" ("id", "name", "description", "price", "isPremium", "featured", "screenshotsUrl", "categoryId") VALUES ('cf7c1785-c487-4b25-85aa-b3207384a5c8', 'Creative Blog', 'A sleek and modern portfolio template for showcasing your work.', 479, true, false, 'https://i.imgur.com/YfJQV5z.png?id=166', '35c587a6-1112-46ee-9427-bbd0dcf61255');
INSERT INTO "Template" ("id", "name", "description", "price", "isPremium", "featured", "screenshotsUrl", "categoryId") VALUES ('84d40e24-b27c-4e35-beb8-32e27bb5244f', 'Modern Portfolio', 'A comprehensive ecommerce template with all the necessary features.', 649, false, true, 'https://i.imgur.com/YfJQV5z.png?id=173', '35c587a6-1112-46ee-9427-bbd0dcf61255');
INSERT INTO "Template" ("id", "name", "description", "price", "isPremium", "featured", "screenshotsUrl", "categoryId") VALUES ('f182e634-e836-482c-941f-8bf6956a146e', 'Business Starter', 'A minimalist design template for a clean and simple website.', 161, true, false, 'https://i.imgur.com/YfJQV5z.png?id=180', '0ebeb703-195c-47ed-b2da-14d54bd4ab3d');
INSERT INTO "Template" ("id", "name", "description", "price", "isPremium", "featured", "screenshotsUrl", "categoryId") VALUES ('da7ead3d-b454-4bd9-95fe-3e25f0e59874', 'Creative Blog', 'A comprehensive ecommerce template with all the necessary features.', 566, true, false, 'https://i.imgur.com/YfJQV5z.png?id=187', '35c587a6-1112-46ee-9427-bbd0dcf61255');
INSERT INTO "Template" ("id", "name", "description", "price", "isPremium", "featured", "screenshotsUrl", "categoryId") VALUES ('1dbe5ce2-1a52-4dec-b8fd-2cd53be0bb61', 'Creative Blog', 'A sleek and modern portfolio template for showcasing your work.', 318, false, false, 'https://i.imgur.com/YfJQV5z.png?id=194', 'ae9d1596-edc2-437b-88cb-838a4a83d3a1');
INSERT INTO "Template" ("id", "name", "description", "price", "isPremium", "featured", "screenshotsUrl", "categoryId") VALUES ('cd91c9e5-fe31-41d2-a7bb-c6490f1c2bd0', 'Ecommerce Pro', 'A creative blog template with a focus on content and aesthetics.', 123, false, false, 'https://i.imgur.com/YfJQV5z.png?id=201', '9dc38c7c-f999-4b3e-9b56-727c6840763e');
INSERT INTO "Template" ("id", "name", "description", "price", "isPremium", "featured", "screenshotsUrl", "categoryId") VALUES ('c344bb5d-db40-4926-b7db-2bad2c40c64f', 'Modern Portfolio', 'A creative blog template with a focus on content and aesthetics.', 518, false, true, 'https://i.imgur.com/YfJQV5z.png?id=208', '6b77bb36-2e46-4baa-b369-60e8630eb293');
INSERT INTO "Template" ("id", "name", "description", "price", "isPremium", "featured", "screenshotsUrl", "categoryId") VALUES ('25f11092-4f94-45cb-ae38-d3a5148be2da', 'Business Starter', 'A creative blog template with a focus on content and aesthetics.', 612, false, false, 'https://i.imgur.com/YfJQV5z.png?id=215', 'ad1df181-a1ad-4da7-b2c8-6cf96e2aca5e');
INSERT INTO "Template" ("id", "name", "description", "price", "isPremium", "featured", "screenshotsUrl", "categoryId") VALUES ('fd9e60b3-ba34-4de5-a85c-f671787adf9c', 'Ecommerce Pro', 'A sleek and modern portfolio template for showcasing your work.', 557, true, false, 'https://i.imgur.com/YfJQV5z.png?id=222', '0ebeb703-195c-47ed-b2da-14d54bd4ab3d');
INSERT INTO "Template" ("id", "name", "description", "price", "isPremium", "featured", "screenshotsUrl", "categoryId") VALUES ('927168c6-97a4-4926-bf51-914b9498bec1', 'Minimalist Design', 'A creative blog template with a focus on content and aesthetics.', 858, true, false, 'https://i.imgur.com/YfJQV5z.png?id=229', '32aabc24-621b-48d0-b93e-203de1612361');

INSERT INTO "Transaction" ("id", "amount", "transactionType", "paymentMethod", "userId") VALUES ('c9f3c347-89dd-4c9c-9753-d8fffacbb620', 160, 'transfer', 'PayPal', 'db4a7bbe-ef91-4f96-82e9-04a1ec41869e');
INSERT INTO "Transaction" ("id", "amount", "transactionType", "paymentMethod", "userId") VALUES ('61582416-a8ad-4903-a897-fd3ff4283bc7', 870, 'transfer', 'PayPal', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Transaction" ("id", "amount", "transactionType", "paymentMethod", "userId") VALUES ('58e0d932-6341-474c-aacb-7b76676ea003', 303, 'refund', 'Credit Card', '2c558c4b-9a89-4354-9649-731edd082c06');
INSERT INTO "Transaction" ("id", "amount", "transactionType", "paymentMethod", "userId") VALUES ('8e2dfde0-c913-4b2f-bbda-1a78681b4d8c', 924, 'purchase', 'PayPal', '9f9f89e4-74cd-4f90-a2ce-5056817df748');
INSERT INTO "Transaction" ("id", "amount", "transactionType", "paymentMethod", "userId") VALUES ('5b22d0d9-00af-4add-af56-59045f8653ca', 618, 'withdrawal', 'Credit Card', '9f9f89e4-74cd-4f90-a2ce-5056817df748');
INSERT INTO "Transaction" ("id", "amount", "transactionType", "paymentMethod", "userId") VALUES ('c2e76f91-d979-4420-82cc-b721fc84ed5e', 699, 'purchase', 'Bitcoin', '9f9f89e4-74cd-4f90-a2ce-5056817df748');
INSERT INTO "Transaction" ("id", "amount", "transactionType", "paymentMethod", "userId") VALUES ('9cd5c950-7a1d-454a-90e4-2d303cafb669', 602, 'transfer', 'Bitcoin', '2f9eaeee-b72c-4812-879e-7cb56707ec31');
INSERT INTO "Transaction" ("id", "amount", "transactionType", "paymentMethod", "userId") VALUES ('64bd0916-7118-4c0c-b236-7578de15143f', 214, 'refund', 'Bitcoin', '81627b4d-8470-47f0-a4a6-f60a0cd97873');
INSERT INTO "Transaction" ("id", "amount", "transactionType", "paymentMethod", "userId") VALUES ('0d02d3a0-d63a-45e7-92ef-4331eff90860', 262, 'purchase', 'PayPal', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Transaction" ("id", "amount", "transactionType", "paymentMethod", "userId") VALUES ('aedd2a7f-3628-4de2-ae10-c54e068894b8', 205, 'deposit', 'Ethereum', '18b974ff-b022-42dd-a9c8-a8967a5813d3');

INSERT INTO "PurchaseItem" ("id", "price", "transactionId", "templateId") VALUES ('d9460f15-95f0-4c5c-a379-ec15d4ebbb4b', 293, 'aedd2a7f-3628-4de2-ae10-c54e068894b8', 'f182e634-e836-482c-941f-8bf6956a146e');
INSERT INTO "PurchaseItem" ("id", "price", "transactionId", "templateId") VALUES ('077f039d-4c09-4e25-977a-c5142b425d50', 811, 'c2e76f91-d979-4420-82cc-b721fc84ed5e', 'f182e634-e836-482c-941f-8bf6956a146e');
INSERT INTO "PurchaseItem" ("id", "price", "transactionId", "templateId") VALUES ('717ce131-6f67-433f-8079-ecea85131093', 967, '0d02d3a0-d63a-45e7-92ef-4331eff90860', 'c344bb5d-db40-4926-b7db-2bad2c40c64f');
INSERT INTO "PurchaseItem" ("id", "price", "transactionId", "templateId") VALUES ('31c66329-a27d-4926-afd1-f5feb8bc0c24', 470, '58e0d932-6341-474c-aacb-7b76676ea003', 'cf7c1785-c487-4b25-85aa-b3207384a5c8');
INSERT INTO "PurchaseItem" ("id", "price", "transactionId", "templateId") VALUES ('bd089caa-1b3f-4149-a52f-e88879be9a1a', 44, '64bd0916-7118-4c0c-b236-7578de15143f', '927168c6-97a4-4926-bf51-914b9498bec1');
INSERT INTO "PurchaseItem" ("id", "price", "transactionId", "templateId") VALUES ('63131262-ff8e-43ae-b766-057f181ca980', 800, 'aedd2a7f-3628-4de2-ae10-c54e068894b8', '927168c6-97a4-4926-bf51-914b9498bec1');
INSERT INTO "PurchaseItem" ("id", "price", "transactionId", "templateId") VALUES ('d7f204fe-0d9e-403a-8192-25dff8edc39a', 401, 'aedd2a7f-3628-4de2-ae10-c54e068894b8', 'da7ead3d-b454-4bd9-95fe-3e25f0e59874');
INSERT INTO "PurchaseItem" ("id", "price", "transactionId", "templateId") VALUES ('b6da0562-362a-4c2b-9ec7-2dd8927b30e8', 836, 'aedd2a7f-3628-4de2-ae10-c54e068894b8', '1dbe5ce2-1a52-4dec-b8fd-2cd53be0bb61');
INSERT INTO "PurchaseItem" ("id", "price", "transactionId", "templateId") VALUES ('148a612f-6672-4916-a74b-8eb8b5a63b15', 365, '0d02d3a0-d63a-45e7-92ef-4331eff90860', 'da7ead3d-b454-4bd9-95fe-3e25f0e59874');
INSERT INTO "PurchaseItem" ("id", "price", "transactionId", "templateId") VALUES ('9379a80a-8f18-4deb-b8cd-7bc83c2761af', 965, 'c2e76f91-d979-4420-82cc-b721fc84ed5e', '1dbe5ce2-1a52-4dec-b8fd-2cd53be0bb61');

INSERT INTO "CartItem" ("id", "userId", "templateId") VALUES ('6187ad12-e9a2-4412-bd1f-0a6d75651097', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', 'da7ead3d-b454-4bd9-95fe-3e25f0e59874');
INSERT INTO "CartItem" ("id", "userId", "templateId") VALUES ('e4bcfc8f-8bc5-4fc2-b2be-ac03d3a07d28', '2f9eaeee-b72c-4812-879e-7cb56707ec31', '1dbe5ce2-1a52-4dec-b8fd-2cd53be0bb61');
INSERT INTO "CartItem" ("id", "userId", "templateId") VALUES ('968ef3e0-bdee-4875-87b3-39ef02631cb3', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', 'da7ead3d-b454-4bd9-95fe-3e25f0e59874');
INSERT INTO "CartItem" ("id", "userId", "templateId") VALUES ('3da54c0d-7afd-4cb7-907a-f9f3100e6521', '2f9eaeee-b72c-4812-879e-7cb56707ec31', '927168c6-97a4-4926-bf51-914b9498bec1');
INSERT INTO "CartItem" ("id", "userId", "templateId") VALUES ('a974658f-1e16-4cd5-a83a-1a9f39393319', '2c558c4b-9a89-4354-9649-731edd082c06', 'fd9e60b3-ba34-4de5-a85c-f671787adf9c');
INSERT INTO "CartItem" ("id", "userId", "templateId") VALUES ('66a06836-7a8e-4076-a168-e7aa51905bea', '2f9eaeee-b72c-4812-879e-7cb56707ec31', 'da7ead3d-b454-4bd9-95fe-3e25f0e59874');
INSERT INTO "CartItem" ("id", "userId", "templateId") VALUES ('e7d2f3a9-f967-426e-83c6-38d45c265b18', '4c14beaa-1695-4114-83d0-3b2a120c185d', 'c344bb5d-db40-4926-b7db-2bad2c40c64f');
INSERT INTO "CartItem" ("id", "userId", "templateId") VALUES ('b359acf8-8563-4c6e-9e0c-025791c3bb4d', '2f9eaeee-b72c-4812-879e-7cb56707ec31', 'cf7c1785-c487-4b25-85aa-b3207384a5c8');
INSERT INTO "CartItem" ("id", "userId", "templateId") VALUES ('ab02b03b-cb09-4fae-9535-ddabaf404d93', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '927168c6-97a4-4926-bf51-914b9498bec1');
INSERT INTO "CartItem" ("id", "userId", "templateId") VALUES ('eb98d706-648a-457d-a9e7-ad154b9441b1', '18b974ff-b022-42dd-a9c8-a8967a5813d3', 'cf7c1785-c487-4b25-85aa-b3207384a5c8');

INSERT INTO "Review" ("id", "rating", "comment", "userId", "templateId") VALUES ('b9d7a049-0871-4671-93f7-2aef7aa90202', 481, 'Excellent customer service and fast delivery.', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '84d40e24-b27c-4e35-beb8-32e27bb5244f');
INSERT INTO "Review" ("id", "rating", "comment", "userId", "templateId") VALUES ('e21839e1-a217-4495-8bcf-514fa1fce11a', 640, 'Amazing template very easy to use', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', 'c344bb5d-db40-4926-b7db-2bad2c40c64f');
INSERT INTO "Review" ("id", "rating", "comment", "userId", "templateId") VALUES ('5e310b83-d516-46ae-a25b-c1eb80995cfa', 615, 'Good value for the price.', '18b974ff-b022-42dd-a9c8-a8967a5813d3', '927168c6-97a4-4926-bf51-914b9498bec1');
INSERT INTO "Review" ("id", "rating", "comment", "userId", "templateId") VALUES ('dabe3cce-9cf2-4ad7-8dab-9590d08cad31', 338, 'Excellent customer service and fast delivery.', '18b974ff-b022-42dd-a9c8-a8967a5813d3', 'c344bb5d-db40-4926-b7db-2bad2c40c64f');
INSERT INTO "Review" ("id", "rating", "comment", "userId", "templateId") VALUES ('a35b8e6b-21ad-4c92-b760-85288e171a90', 29, 'Amazing template very easy to use', 'db4a7bbe-ef91-4f96-82e9-04a1ec41869e', 'cf7c1785-c487-4b25-85aa-b3207384a5c8');
INSERT INTO "Review" ("id", "rating", "comment", "userId", "templateId") VALUES ('82872843-f667-467a-8566-01445aac74a2', 775, 'Good value for the price.', '4c14beaa-1695-4114-83d0-3b2a120c185d', '927168c6-97a4-4926-bf51-914b9498bec1');
INSERT INTO "Review" ("id", "rating", "comment", "userId", "templateId") VALUES ('19a1379d-c0e5-4aaf-985a-336b688717ac', 307, 'Decent quality but could use some improvements.', 'db4a7bbe-ef91-4f96-82e9-04a1ec41869e', 'c344bb5d-db40-4926-b7db-2bad2c40c64f');
INSERT INTO "Review" ("id", "rating", "comment", "userId", "templateId") VALUES ('e3f67274-225d-46d6-b5dd-a18b0c25298c', 624, 'Amazing template very easy to use', '6a0ecad5-d236-4adb-8bf1-3ff0f0624a46', 'f182e634-e836-482c-941f-8bf6956a146e');
INSERT INTO "Review" ("id", "rating", "comment", "userId", "templateId") VALUES ('1ef4293b-ce52-4bec-93dc-22a33e045989', 318, 'Good value for the price.', '2c558c4b-9a89-4354-9649-731edd082c06', '84d40e24-b27c-4e35-beb8-32e27bb5244f');
INSERT INTO "Review" ("id", "rating", "comment", "userId", "templateId") VALUES ('e2b5c212-0427-4530-8ae0-136b2ee59f04', 811, 'Excellent customer service and fast delivery.', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '1dbe5ce2-1a52-4dec-b8fd-2cd53be0bb61');

INSERT INTO "BlogPost" ("id", "title", "content", "authorId") VALUES ('6033a34a-017a-408e-8c06-0cd171ed5a28', 'Top 5 Tailwind CSS Tips for Your Next.js Project', 'Cryptocurrency payments are becoming increasingly popular in ecommerce. This article explains how they work and the benefits they offer to both merchants and customers.', 'a8cb1eca-201c-400a-a9e9-0e73f757bc33');
INSERT INTO "BlogPost" ("id", "title", "content", "authorId") VALUES ('5bc51dc2-f731-4d34-8888-d142d86a490d', 'Top 5 Tailwind CSS Tips for Your Next.js Project', 'Ecommerce is rapidly evolving with new technologies and trends emerging every year. In this post we explore the key trends to watch in the coming years.', '18b974ff-b022-42dd-a9c8-a8967a5813d3');
INSERT INTO "BlogPost" ("id", "title", "content", "authorId") VALUES ('67d5fa99-ff4a-48c3-b3e9-04153b63e456', 'Building a Seamless User Experience in Ecommerce', 'Ecommerce is rapidly evolving with new technologies and trends emerging every year. In this post we explore the key trends to watch in the coming years.', '4c14beaa-1695-4114-83d0-3b2a120c185d');
INSERT INTO "BlogPost" ("id", "title", "content", "authorId") VALUES ('dd2d3a1c-b767-4e6b-a510-6c0526bf8a6a', 'Top 5 Tailwind CSS Tips for Your Next.js Project', 'Choosing the right template can make or break your online store. Here are some tips to help you select the perfect template for your business.', '9f9f89e4-74cd-4f90-a2ce-5056817df748');
INSERT INTO "BlogPost" ("id", "title", "content", "authorId") VALUES ('20c072ec-c266-4a59-8ceb-f93ca93818ef', 'Top 5 Tailwind CSS Tips for Your Next.js Project', 'Tailwind CSS is a powerful tool for styling your Next.js projects. Discover our top 5 tips to make the most out of Tailwind CSS in your development process.', 'db4a7bbe-ef91-4f96-82e9-04a1ec41869e');
INSERT INTO "BlogPost" ("id", "title", "content", "authorId") VALUES ('dacb1fa6-16c9-485c-8691-2352dc19ac24', 'Understanding Cryptocurrency Payments in Ecommerce', 'Tailwind CSS is a powerful tool for styling your Next.js projects. Discover our top 5 tips to make the most out of Tailwind CSS in your development process.', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "BlogPost" ("id", "title", "content", "authorId") VALUES ('efe9ddc9-ec9c-4a35-b370-77580cbb613d', 'Understanding Cryptocurrency Payments in Ecommerce', 'Cryptocurrency payments are becoming increasingly popular in ecommerce. This article explains how they work and the benefits they offer to both merchants and customers.', '81627b4d-8470-47f0-a4a6-f60a0cd97873');
INSERT INTO "BlogPost" ("id", "title", "content", "authorId") VALUES ('91eaed78-a756-433f-bcab-da6ed49b35c4', 'Top 5 Tailwind CSS Tips for Your Next.js Project', 'Choosing the right template can make or break your online store. Here are some tips to help you select the perfect template for your business.', '9f9f89e4-74cd-4f90-a2ce-5056817df748');
INSERT INTO "BlogPost" ("id", "title", "content", "authorId") VALUES ('54f7b6ac-cd16-4ffa-8670-4167b353e66d', 'Building a Seamless User Experience in Ecommerce', 'Creating a seamless user experience is crucial for the success of any ecommerce website. Learn how to optimize your site for better user engagement and satisfaction.', '81627b4d-8470-47f0-a4a6-f60a0cd97873');
INSERT INTO "BlogPost" ("id", "title", "content", "authorId") VALUES ('f3ffc2fe-d1a2-4f98-a3bc-9170f24fffc8', 'How to Choose the Right Template for Your Online Store', 'Tailwind CSS is a powerful tool for styling your Next.js projects. Discover our top 5 tips to make the most out of Tailwind CSS in your development process.', '2f9eaeee-b72c-4812-879e-7cb56707ec31');

  `

  const sqls = splitSql(sql)

  for (const sql of sqls) {
    try {
      await prisma.$executeRawUnsafe(`${sql}`)
    } catch (error) {
      console.log(`Could not insert SQL: ${error.message}`)
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async error => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
