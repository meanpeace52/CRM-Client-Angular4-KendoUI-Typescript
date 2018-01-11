import { FIELD_TYPE, FieldTemplate, Grid, GridColumn, GridTemplate, VALIDATOR_TYPE, ERROR_MESSAGES } from "crm-platform";
import { ENTITY_NAME, REQUEST_URL } from "../constants";

import * as _ from "lodash";

export class ContactGridFactory {

  public static FIRST_NAME_FIELD_TEMPLATE: FieldTemplate = {
    name: "firstName",
    type: FIELD_TYPE.text,
    title: "First Name",
    validators: [
      {
        type: VALIDATOR_TYPE.required,
        errorMessage: "First name is required"
      }
    ]
  };

  public static LAST_NAME_FIELD_TEMPLATE: FieldTemplate = {
    name: "lastName",
    type: FIELD_TYPE.text,
    title: "Last Name",
    validators: [
      {
        type: VALIDATOR_TYPE.required,
        errorMessage: "Last name is required"
      }
    ]
  };

  public static JOB_TITLE_FIELD_TEMPLATE: FieldTemplate = {
    name: "jobTitle",
    type: FIELD_TYPE.text,
    title: "Job Title"
  };

  public static EMAIL_FIELD_TEMPLATE: FieldTemplate = {
    name: "email",
    type: FIELD_TYPE.email,
    title: "Email",
    validators: [
      {
        type: VALIDATOR_TYPE.email_format,
        errorMessage: ERROR_MESSAGES.incorrect_email
      }
    ]
  };

  public static PHONE_FIELD_TEMPLATE: FieldTemplate = {
    name: "phone",
    type: FIELD_TYPE.text,
    title: "Phone"
  };

  public static EXTENSION_FIELD_TEMPLATE: FieldTemplate = {
    name: "extension",
    type: FIELD_TYPE.text,
    title: "Extension"
  };
    
  public static FAX_FIELD_TEMPLATE: FieldTemplate = {
    name: "fax",
    type: FIELD_TYPE.text,
    title: "Fax"
  };

  public static MOBILE_FIELD_TEMPLATE: FieldTemplate = {
    name: "mobile",
    type: FIELD_TYPE.text,
    title: "Mobile"
  };

  public static ACCOUNT_FIELD_TEMPLATE: FieldTemplate = {
    name: "account_id",
    type: FIELD_TYPE.text,
    title: "Account"
  };

  public static SOCIAL_NETWORK_FIELD_TEMPLATE: FieldTemplate = {
    name: "social_networks_id",
    type: FIELD_TYPE.text,
    title: "Social Networks"
  };

  public static ADDRESS_FIELD_TEMPLATE: FieldTemplate = {
    name: "address_id",
    type: FIELD_TYPE.text,
    title: "Address"
  };

  public static CONTACT_GRID_TEMPLATE: GridTemplate = {
    id: ENTITY_NAME.contact,
    columns: [
      {field: ContactGridFactory.FIRST_NAME_FIELD_TEMPLATE},
      {field: ContactGridFactory.LAST_NAME_FIELD_TEMPLATE},
      {field: ContactGridFactory.JOB_TITLE_FIELD_TEMPLATE},
      {field: ContactGridFactory.EMAIL_FIELD_TEMPLATE},
      {field: ContactGridFactory.PHONE_FIELD_TEMPLATE},
      {field: ContactGridFactory.EXTENSION_FIELD_TEMPLATE},
      {field: ContactGridFactory.FAX_FIELD_TEMPLATE},
      {field: ContactGridFactory.MOBILE_FIELD_TEMPLATE},
      {field: ContactGridFactory.ACCOUNT_FIELD_TEMPLATE},
      {field: ContactGridFactory.SOCIAL_NETWORK_FIELD_TEMPLATE},
      {field: ContactGridFactory.ADDRESS_FIELD_TEMPLATE}
    ]
  };

  private constructor() {
    // do nothing;
  }

  public static newGridInstance(): Grid {
    let grid = Grid.newInstance(ContactGridFactory.CONTACT_GRID_TEMPLATE);
    // grid.addColumn(GridColumn.newInstanceByField(new RevenueField()), 3);
    // let statusField = StatusField.newStatusFieldInstance(OpportunityGridFactory.STATUS_FIELD_TEMPLATE, statuses);
    // grid.addColumn(GridColumn.newInstanceByField(statusField), grid.columns.length - 1);

    return grid;
  }
}