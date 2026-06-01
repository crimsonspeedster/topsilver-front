import {ContentBlockObject} from "@interfaces/entities/blocks/content-block";


const ContentBlock = (props: ContentBlockObject) => {
    return (
        <section className="py-5">
            <div className="container">
                <div
                    dangerouslySetInnerHTML={{
                        __html: props.description
                    }}
                />
            </div>
        </section>
    );
}

export default ContentBlock;