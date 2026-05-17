'use client';

import {BonusObject} from "@interfaces/entities/bonuses";
import {useTranslations} from "next-intl";
import { Card, ListGroup, Badge } from 'react-bootstrap';


type Props = {
    active_total: number;
    active_bonuses: BonusObject[],
    future_bonuses: BonusObject[],
}

const ProfileBonuses = (
    {
        active_total,
        active_bonuses,
        future_bonuses,
    }: Props
) => {
    const tDashboard = useTranslations('Dashboard');
    const tCommon = useTranslations('Common');

    return (
        <section className="py-5">
            <div className="container">
                <h1 className="text-center">{tDashboard('bonuses')}</h1>

                <Card className="shadow-sm border-0 rounded-4">
                    <Card.Body>
                        {
                            active_total === 0 ?
                                <div className="text-center">
                                    <div className="mb-3 fs-1">🎁</div>

                                    <h5 className="fw-bold mb-2">{tDashboard('no_bonuses')}</h5>

                                    <p
                                        className="text-muted mb-0"
                                        dangerouslySetInnerHTML={{
                                            __html: tDashboard('no_active_bonuses')
                                        }}
                                    />
                                </div>
                                :
                                <>
                                    <div className="d-flex align-items-center justify-content-between mb-4">
                                        <div>
                                            <h5 className="mb-1 fw-bold">{tDashboard('active_bonuses')}</h5>

                                            <div className="fs-2 fw-bold text-success">
                                                {active_total} {tCommon('bonuses')}
                                            </div>
                                        </div>

                                        <Badge
                                            bg="success"
                                            pill
                                            className="px-3 py-2"
                                        >
                                            Active
                                        </Badge>
                                    </div>

                                    {
                                        (active_bonuses.length > 0 || future_bonuses.length > 0) &&
                                        <ListGroup variant="flush">
                                            {
                                                active_bonuses.map((item, i) =>
                                                    <ListGroup.Item
                                                        className="px-0 d-flex justify-content-between align-items-center"
                                                        key={i}
                                                    >
                                                        <span>{item.amount} {tCommon('bonuses')}</span>

                                                        <small className="text-muted">
                                                            {tCommon('to')} {item.expires_at}
                                                        </small>
                                                    </ListGroup.Item>
                                                )
                                            }

                                            {
                                                future_bonuses.map((item, i) =>
                                                    <ListGroup.Item
                                                        className="px-0"
                                                        key={i}
                                                    >
                                                        <div className="d-flex justify-content-between align-items-start">
                                                            <span className="fw-medium">{item.amount} {tCommon('bonuses')}</span>

                                                            <div className="text-end">
                                                                <div className="text-warning fw-semibold">{tDashboard('will_become_active')}</div>

                                                                <small className="text-muted">
                                                                    {item.available_from} ({tCommon('through')} 10 {tCommon('days')})
                                                                </small>
                                                            </div>
                                                        </div>
                                                    </ListGroup.Item>
                                                )
                                            }
                                        </ListGroup>
                                    }
                                </>

                        }
                    </Card.Body>
                </Card>
            </div>
        </section>
    );
}

export default ProfileBonuses;