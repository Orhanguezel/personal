import * as Mod from '@/app/(main)/admin/(admin)/reviews/ReviewsForm';
const AnyMod = Mod as any;
const C = AnyMod.default ?? AnyMod.ReviewsForm;
export const ReviewsForm = AnyMod.ReviewsForm ?? C;
export default C;
export * from '@/app/(main)/admin/(admin)/reviews/ReviewsForm';
