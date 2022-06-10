import React, { useEffect } from 'react';
import { connect } from "react-redux";
import * as actions from "../../../actions/repair";
import RepairList from "./RepairsList";

const Repairs = (props) => {

    useEffect(() => {
        props.fetchAllRepairs()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const HandleDeleteButton = id => {
        props.deleteRepair(id);
    }

    const MarkAsComplete = id => {
        props.markComplete(id);
    }

    return (
        <RepairList 
        repairList={props.repairList}
        HandleDeleteButton={HandleDeleteButton}
        MarkAsComplete={MarkAsComplete}
        />
     );
}
const mapStateToProps = state => ({
    repairList: state.Repair.repairData
})

const mapActionsToProps = {
    fetchAllRepairs: actions.fetchAll,
    deleteRepair: actions.Delete,
    markComplete: actions.markAsComplete
}
export default connect(mapStateToProps, mapActionsToProps)(Repairs);