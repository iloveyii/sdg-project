import React from "react";
import PropTypes from "prop-types";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

class UserGroupTypes extends React.Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    change: PropTypes.func.isRequired
  };

  render() {
    const { value, index, change } = this.props;
    const groups = [
      "Admin",
      "Donor",
      "Organization"
    ];

    return (
      <FormControl>
        <Select
          value={value}
          onChange={event => change(event.target.value, index)}
          style={{ fontSize: "inherit" }}
        >
          {groups.map((groupType, index) => (
            <MenuItem key={index} value={groupType}>
              {groupType}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }
}

export default UserGroupTypes;
