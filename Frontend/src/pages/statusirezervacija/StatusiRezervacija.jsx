import { Container, Table } from "react-bootstrap";


export default function StatusiRezervacija (){

   
    
    return (

        <Container>
            <Table striped bodered hover responsive>
                <thead>
                    <tr> 
                        <th>Naziv</th>
                        <th>Pokazatelj</th>
                     </tr>
                </thead>
            </Table>
        </Container>
    );
}