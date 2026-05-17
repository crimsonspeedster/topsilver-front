import {getTranslations} from "next-intl/server";

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
            </div>
        </section>
    );
}