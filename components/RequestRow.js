import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Brd from '../ethereum/brd';

class RequestRow extends Component {
  onApprove = async () => {
    const brd = Brd(this.props.address);

    const accounts = await web3.eth.getAccounts();
    await brd.methods.approveRequest(this.props.id).send({
      from: accounts[0]
    });
  };

  onFinalize = async () => {
    const brd = Brd(this.props.address);

    const accounts = await web3.eth.getAccounts();
    await brd.methods.finalizeRequest(this.props.id).send({
      from: accounts[0]
    });
  };

  render() {
    const { Row, Cell } = Table;
    const { id, request, approversCount } = this.props;
    const readyToFinalize = request.approvalCount > approversCount / 2;

    return (
      <Row
        disabled={request.complete}
        positive={readyToFinalize && !request.complete}
      >
        <Cell>{id + 1}</Cell>
        <Cell>{request.description}</Cell>
        <Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
        <Cell>{request.recipient}</Cell>
        <Cell>
          {request.approvalCount}/{approversCount}
        </Cell>
        <Cell>
          {request.complete ? null : (
            <Button color='green' basic onClick={this.onApprove}>
              True
            </Button>
          )}
        </Cell>
        {/* <Cell>
          {request.complete ? null : (
            <Button color='red' basic onClick={this.onApprove}>
              False
            </Button>
          )}
        </Cell> */}
        <Cell>
          {request.complete ? null : (
            <Button color='blue' basic onClick={this.onFinalize}>
              Finalize
            </Button>
          )}
        </Cell>
      </Row>
    );
  }
}

export default RequestRow;
