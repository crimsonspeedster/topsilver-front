import {TaxonomyCollectionObject} from "@interfaces/entities/taxonomy";
import {MediaObject, PaginationObject} from "@interfaces/common";
import PageBanner from "@src/commonsections/PageBanner";
import {useTranslations} from "next-intl";
import { Col, Row } from "react-bootstrap";
import TaxonomiesItem from "@src/components/Taxonomy/TaxonomiesItem";
import PaginationComponent from "@src/components/PaginationComponent";


type Props = {
    title: string;
    taxonomies: TaxonomyCollectionObject[];
    pagination: PaginationObject;
    slug: string;
    banner?: MediaObject | null;
    currentPage: number;
};

const TaxonomiesTemplate = (props: Props) => {
    const tCommon = useTranslations('Common');

    return (
        <article>
            {
                props.banner && (
                    <PageBanner
                        title={props.title}
                        header_tag={'h1'}
                        media={props.banner}
                    />
                )
            }

            <section className="py-5 cat-section">
                <div className="container">
                    {
                        props.taxonomies.length > 0 ?
                            (
                                <Row className="g-lg-4 g-2">
                                    {
                                        props.taxonomies.map((taxonomy) => (
                                            <Col
                                                md={4}
                                                xs={6}
                                                key={taxonomy.id}
                                            >
                                                <TaxonomiesItem
                                                    item={taxonomy}
                                                />
                                            </Col>
                                        ))
                                    }
                                </Row>
                            )
                            :
                            (
                                <h2 className="text-center">{tCommon('nothing_found')}</h2>
                            )
                    }

                    <PaginationComponent
                        pagination={props.pagination}
                        slug={props.slug}
                        current_page={props.currentPage}
                    />
                </div>
            </section>
        </article>
    );
}

export default TaxonomiesTemplate;