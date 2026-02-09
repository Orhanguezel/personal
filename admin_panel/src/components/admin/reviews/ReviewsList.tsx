import * as Mod from '@/app/(main)/admin/(admin)/reviews/ReviewsList';
const AnyMod = Mod as any;
const C = AnyMod.default ?? AnyMod.ReviewsList;
export const ReviewsList = AnyMod.ReviewsList ?? C;
export default C;
export * from '@/app/(main)/admin/(admin)/reviews/ReviewsList';
