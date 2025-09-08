import React from "react";
import RequestItem from "./RequestItem";
import { TimeOffRequest } from "../data/mockData";

interface Props {
    requests: TimeOffRequest[];
    onDecision?: (id: string, status: "Approved" | "Rejected") => void;
}

const RequestList: React.FC<Props> = ({ requests, onDecision }) => (
    <>
        {requests.map(r => (
            <RequestItem key={r.id} request={r} onDecision={onDecision} />
        ))}
    </>
);

export default RequestList;
