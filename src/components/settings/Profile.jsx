import React from "react";
import {useAuth0} from "../auth/Auth";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import {FaTrashAlt, FaPencilAlt} from "react-icons/fa";

function ProfileRow({name: displayName, value, readOnly = true}) {
    return (
        <tr>
            <td className="text-left">{displayName}</td>
            <td className="text-left">{value}</td>
            <td className="text-right">
                <ButtonGroup>
                    <Button variant="outline-warning" className="mr-2" disabled={readOnly}>
                        <FaPencilAlt style={{verticalAlign: "baseline"}}/>
                    </Button>
                    <Button variant="outline-danger" className="mr-2" disabled={readOnly}>
                        <FaTrashAlt style={{verticalAlign: "baseline"}}/>
                    </Button>
                </ButtonGroup>
            </td>
        </tr>
    );
}

function Profile() {
    const {loading, user} = useAuth0();

    return (
        <Table responsive hover striped variant="dark">
            <thead>
            <tr>
                <th className="text-left">Field</th>
                <th className="text-left">Value</th>
                <th className="text-right">Actions</th>
            </tr>
            </thead>
            <tbody>
            {
                !loading && user &&
                <>
                    <ProfileRow name="Name" value={user.name} readOnly/>
                    <ProfileRow name="E-mail Address" value={user.email} readOnly/>
                </>
            }
            </tbody>
        </Table>
    );
}

export default Profile;
