import React from "react";
import PropTypes from "prop-types";

import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { confirmable, createConfirmation } from "react-confirm";
import { useState } from "react";

class Confirmation extends React.Component {
  render() {
    const {
      proceedLabel,
      cancelLabel,
      title,
      confirmation,
      show,
      proceed,
      enableEscape = true,
    } = this.props;
    return (
      <div className="static-modal ">
        <Modal
          className="confrim_varna"
          show={show}
          onHide={() => proceed(false)}
          backdrop={enableEscape ? true : "static"}
          keyboard={enableEscape}
        >
          <Modal.Body style={{ direction: "rtl", textAlign: "center" }}>
            <h5 className="fw-bolder">{confirmation}</h5>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="bg-danger border-0 rounded text-light px-2 py-1"
              onClick={() => proceed(false)}
            >
              {cancelLabel}
            </button>

            <button
              className="bg-success border-0 rounded text-light px-2 py-1"
              onClick={() => proceed(true)}
            >
              {proceedLabel}
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

Confirmation.propTypes = {
  okLabbel: PropTypes.string,
  cancelLabel: PropTypes.string,
  title: PropTypes.string,
  confirmation: PropTypes.string,
  show: PropTypes.bool,
  proceed: PropTypes.func, // called when ok button is clicked.
  enableEscape: PropTypes.bool,
};

export function confirm(
  confirmation,
  proceedLabel = "بله",
  cancelLabel = "خیر",
  options = {}
) {
  return createConfirmation(confirmable(Confirmation))({
    confirmation,
    proceedLabel,
    cancelLabel,
    ...options,
  });
}

class ConfirmationAlert extends React.Component {
  state = {
    showw: true,
  };
  constructor(props) {
    super(props);
    this.setState({
      showw: true,
    });
  }

  toHide = () => {
    this.setState({
      showw: false,
    });
  };
  render() {
    const { confirmation, show, proceed, enableEscape = true } = this.props;

    return (
      <div className="static-modal ">
        {setTimeout(() => {
          this.toHide();
        }, 3000)}
        <Modal
          className="confrim_varna"
          show={this.state.showw}
          onHide={() => proceed(false)}
          backdrop={enableEscape ? true : "static"}
          keyboard={enableEscape}
        >
          <Modal.Body style={{ direction: "rtl", textAlign: "center" }}>
            <h5 className="fw-bolder">{confirmation}</h5>
          </Modal.Body>
        </Modal>
        ;
      </div>
    );
  }
}

ConfirmationAlert.propTypes = {
  okLabbel: PropTypes.string,
  cancelLabel: PropTypes.string,
  title: PropTypes.string,
  confirmation: PropTypes.string,
  show: PropTypes.bool,
  proceed: PropTypes.func, // called when ok button is clicked.
  enableEscape: PropTypes.bool,
};

export function confirmAlert(confirmation, options = {}) {
  return createConfirmation(confirmable(ConfirmationAlert))({
    confirmation,
    ...options,
  });
}
