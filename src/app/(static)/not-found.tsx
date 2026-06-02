import {getTranslations} from "next-intl/server";
import Link from "next/link";

export const metadata = {
    title: 'Сторінку не знайдено',
    description: 'Запитувана сторінка не існує',
};

export default async function NotFound() {
    const tCommon = await getTranslations('Common');

    return (
        <section className="py-5">
            <div className="container text-center">
                <h1>404</h1>

                <p>{tCommon('not_found')}</p>

                <div className="d-flex justify-content-center mt-4">
                    <Link
                        className="rounded-pill text-white px-4 fw-semibold btn btn-primary"
                        href="/"
                    >{tCommon('return_to_home')}</Link>
                </div>
            </div>
        </section>
    );
}