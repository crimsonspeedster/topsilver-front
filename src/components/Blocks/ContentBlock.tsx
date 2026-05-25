import {ContentBlockLayoutObject} from "@interfaces/entities/blocks/content-block";


const ContentBlock = (props: ContentBlockLayoutObject) => {
    return (
        <section className="py-5">
            <div className="container">
                <div
                    dangerouslySetInnerHTML={{
                        __html: props.attributes.description
                    }}
                />
            </div>
        </section>
    );
}

export default ContentBlock;