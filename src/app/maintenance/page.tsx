import {Metadata} from "next";

export default function MaintenancePage () {
    return (
        <section className="py-5 text-center">
            <div className="container">
                <h1>Сайт тимчасово недоступний</h1>

                <p>Ми проводимо технічні роботи</p>
            </div>
        </section>
    );
}

export const metadata: Metadata = {
    title: 'Сайт тимчасово недоступний',
    description: 'Ми проводимо технічні роботи',
    robots: {
        index: false,
        follow: false,
    },
};