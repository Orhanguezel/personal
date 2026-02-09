import * as Mod from '@/app/(main)/admin/(admin)/storage/StorageAdminPage';
const AnyMod = Mod as any;
const C = AnyMod.default ?? AnyMod.StorageAdminPage;
export const StorageAdminPage = AnyMod.StorageAdminPage ?? C;
export default C;
export * from '@/app/(main)/admin/(admin)/storage/StorageAdminPage';
