import Cookies from 'js-cookie';

export const getWishlist = (): number[] => {
    const wishlist = Cookies .get('wishlist');

    return wishlist ? JSON.parse(wishlist) : [];
};