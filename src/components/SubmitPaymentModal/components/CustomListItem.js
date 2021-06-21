import {
  Box,
  IconButton,
  InputBase,
  InputAdornment,
  Typography,
  withStyles,
} from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/styles';
import cn from 'classnames';
import { Alert } from '@material-ui/lab';
import { useTranslation } from 'react-i18next';
import InfoIcon from '@material-ui/icons/Info';
const useStyles = makeStyles(theme => ({
  additionalAmountInputLabel: {
    top: '20px',
  },
  additionalAmountInput: {
    height: '52px',
    fontSize: '22px',
  },
  payMoreButton: {
    background: theme.palette.primary.main,
    color: theme.palette.common.white,
    boxShadow:
      '0px 3px 1px -2px rgba(0, 0, 0, 0.1), 0px 2px 2px rgba(0, 0, 0, 0.06), 0px 1px 5px rgba(0, 0, 0, 0.04)',
    borderRadius: '8px',
    width: '97px',
    height: '40px',
    textAlign: 'center',
    fontSize: '15px',
    lineHeight: '24px',
    alignItems: 'center',
    letterSpacing: '0.1px',
    position: 'relative',
    bottom: '3px',
    '&:hover, &.Mui-focusVisible': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  inputField: {
    marginTop: '12px',
  },
  fauxInputField: {
    padding: '10px',
    marginTop: '12px',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: theme.palette.common.grey[300],
    borderRadius: '8px',
    '& p': {
      display: 'inline-block',
    },
    '& p:nth-of-type(1)': {
      fontSize: '14px',
    },
    '& p:nth-of-type(3)': {
      paddingTop: '8px',
      fontSize: '22px',
    },
  },
  fauxInputFieldDisabled: {
    borderColor: theme.palette.common.grey[300],
    backgroundColor: theme.palette.common.grey[100],
  },
  fauxInputFieldBlue: {
    borderColor: theme.palette.primary.main,
  },
  fauxFloatRight: {
    float: 'right',
    fontSize: '14px',
  },
  iconButtonFilled: {
    marginLeft: '10px',
    backgroundColor: theme.palette.common.grey[200],
    fill: theme.palette.primary.main,
    '& span svg': {
      fontSize: '12px',
    },
  },
  alert: {
    float: 'right',
    padding: '0px 4px',
    border: '2px solid rgba(50, 70, 100, 0.1)',
    boxSizing: 'border-box',
    borderRadius: '8px',
    fontSize: '12px',
    height: '20px',
    lineHeight: '0px',
    borderColor: '#ebf8ec',
    backgroundColor: theme.palette.success.lightBackground,
    color: theme.palette.success.darkAlt,
    position: 'relative',
    top: '0px',
  },
  quaternary: {
    fontSize: '12px',
  },
}));

const CustomListItem = props => {
  const classes = useStyles();
  const { t } = useTranslation();
  const {
    primary,
    secondary,
    tertiary,
    quaternary,
    icon,
    onClick,
    onChange,
    value,
    recommended,
    info,
    disabled,
    className,
    handleAmountChosen,
    isAutoPay,
  } = props;
  return (
    <Box
      className={
        onChange && value
          ? !disabled
            ? cn(classes.fauxInputField, classes.fauxInputFieldBlue)
            : cn(classes.fauxInputField, classes.fauxInputFieldDisabled)
          : !disabled
          ? cn(classes.fauxInputField)
          : cn(classes.fauxInputField, classes.fauxInputFieldDisabled)
      }
      onClick={icon === undefined ? onClick : undefined}
    >
      <Typography color={onChange && !disabled ? 'primary' : 'textSecondary'}>{primary}</Typography>
      <Typography className={classes.fauxFloatRight}>{tertiary}</Typography>
      {info && <InfoIcon className={classes.fauxFloatRight} color={'disabled'} />}
      {recommended && (
        <Alert icon={false} className={classes.alert}>
          {t('content.Recommended')}
        </Alert>
      )}
      <br />
      {onChange ? (
        <InputBase
          placeholder={'$0'}
          className={classes.additionalAmountInput}
          key={'otherAmount'}
          id={'otherAmount'}
          type={'text'}
          variant={''}
          fullWidth
          value={value}
          onChange={onChange}
          startAdornment={value ? '$' : false}
          endAdornment={
            value && handleAmountChosen ? (
              <InputAdornment position="end">
                <IconButton
                  onClick={() =>
                    isAutoPay ? handleAmountChosen(value, false) : handleAmountChosen(value, true)
                  }
                  className={classes.payMoreButton}
                >
                  {t('content.Confirm')}
                </IconButton>
              </InputAdornment>
            ) : (
              false
            )
          }
          inputProps={{
            maxLength: 6,
          }}
        />
      ) : (
        <>
          <Typography color={'textPrimary'} className={className}>
            {secondary}
          </Typography>
          {icon && (
            <CustomIconButton size={'small'} className={classes.iconButtonFilled} onClick={onClick}>
              {icon}
            </CustomIconButton>
          )}
        </>
      )}
      {quaternary && (
        <>
          <br />
          <Typography color={'textSecondary'} className={classes.quaternary}>
            {quaternary}
          </Typography>
        </>
      )}
    </Box>
  );
};

const CustomIconButton = withStyles(theme => ({
  root: {
    width: '32px',
    height: '32px',
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.background.icon,
    '&:hover': {
      backgroundColor: theme.palette.background.icon,
    },
  },
}))(IconButton);
export default CustomListItem;
