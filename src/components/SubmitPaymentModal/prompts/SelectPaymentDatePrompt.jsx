import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import {
  Backdrop,
  Box,
  Button,
  DialogContent,
  FormControlLabel,
  List,
  ListItem,
  ListItemSecondaryAction,
  Radio,
  RadioGroup,
  Slide,
} from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/styles';
import { green } from '@material-ui/core/colors';
import CheckIcon from '@material-ui/icons/Check';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import DayjsUtils from '@date-io/dayjs';

import { minimumDays, prettyDate } from '@/utils/prettyHelpers';
import { SuccessButton } from '@/components';
import useGlobalStyles from '@/themes/useGlobalStyles';

const useStyles = makeStyles(theme => ({
  confirmSubTitle: {
    margin: '0px auto 10px',
    textAlign: 'center',
    fontSize: '14px',
    lineHeight: '20px',
    display: 'block',
    alignItems: 'center',
    letterSpacing: '0.1px',
    fontWeight: 500,
  },
  confirmPanelBackdrop: {
    zIndex: 2000,
  },
  confirmPanelRoot: {
    zIndex: 3000,
    position: 'relative',
    '& > *': {
      paddingBottom: '20px',
    },
  },
  checkIcon: {
    color: green[500],
    float: 'right',
    margin: '10px 10px 0 0',
  },
  listBorder: {
    borderColor: theme.palette.common.grey[100],
    borderSize: '2px',
    borderStyle: 'solid',
    height: '56px',
    borderRadius: '8px',
    marginBottom: '16px',
  },
  listSelected: {
    borderColor: theme.palette.primary.main,
  },
  calButton: {
    borderColor: theme.palette.common.grey[200],
    borderWidth: '2px',
    borderStyle: 'solid',
    borderRadius: '8px',
    top: '7px',
    color: theme.palette.primary.main,
  },
  calIcon: {
    marginRight: '10px',
    fontSize: '14px',
  },
}));

const SelectPaymentDatePrompt = props => {
  const classes = useStyles();
  const { t } = useTranslation();
  const globalClasses = useGlobalStyles();
  const { open, onClose, dueDate, chosenDate, setChosenDate } = props;
  const newDate = new Date();
  const twoDaysFrom = new Date(newDate.setDate(newDate.getDate() + 2));
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [otherDate, setOtherDate] = useState(twoDaysFrom);
  const [chosenDateInternal, setChosenDateInternal] = useState(chosenDate ?? twoDaysFrom);

  const handleChosenDate = useCallback(() => {
    setChosenDate(chosenDateInternal);
    onClose(false);
  }, [chosenDateInternal]);

  const handleCalendar = useCallback(data => {
    const date = prettyDate(new Date(data));
    setOtherDate(date);
    setChosenDateInternal(date);
    setCalendarOpen(false);
  }, []);
  return (
    <MuiPickersUtilsProvider utils={DayjsUtils}>
      <Backdrop open={open} className={classes.confirmPanelBackdrop}>
        <Slide direction="up" in={open} mountOnEnter unmountOnExit>
          <Drawer
            id={'confirmPanel'}
            variant={'permanent'}
            anchor={'bottom'}
            open={open}
            className={classes.confirmPanelRoot}
            PaperProps={{
              className: globalClasses.modalPaper,
              ['data-testid']: 'SubmitPaymentSelectDate',
            }}
          >
            <Box className={classes.header}>
              <CheckIcon className={classes.checkIcon} onClick={handleChosenDate} />
              <DialogContent className={classes.confirmSubTitle}>
                {t('content.Payment Date')}
              </DialogContent>
            </Box>
            <DialogContent>
              <Box>
                <RadioGroup
                  aria-label="chosenDate"
                  name="chosenDate"
                  value={chosenDateInternal}
                  onChange={e => setChosenDateInternal(e.target.value)}
                >
                  <List>
                    <ListItem
                      className={
                        chosenDateInternal === dueDate
                          ? cn(classes.listBorder, classes.listSelected)
                          : cn(classes.listBorder)
                      }
                    >
                      <FormControlLabel
                        value={prettyDate(dueDate)}
                        control={<Radio />}
                        label={t('content.Statement Due Date')}
                        disabled={!minimumDays(dueDate, 2)}
                      />
                      <ListItemSecondaryAction>{prettyDate(dueDate)}</ListItemSecondaryAction>
                    </ListItem>
                    <ListItem
                      className={
                        chosenDateInternal === otherDate
                          ? cn(classes.listBorder, classes.listSelected)
                          : cn(classes.listBorder)
                      }
                      onClick={() => setCalendarOpen(true)}
                    >
                      <FormControlLabel
                        value={otherDate}
                        control={<Radio />}
                        label={t('content.Other')}
                      />
                      <ListItemSecondaryAction>
                        <Button className={classes.calButton} onClick={() => setCalendarOpen(true)}>
                          <CalendarTodayIcon className={classes.calIcon} />
                          {prettyDate(otherDate)}
                        </Button>
                        <DatePicker
                          DialogProps={{
                            style: { zIndex: 9999 },
                          }}
                          style={{ display: 'none' }}
                          autoOk={true}
                          open={calendarOpen}
                          cancelLabel={false}
                          okLabel={false}
                          disableToolbar
                          disablePast
                          minDate={twoDaysFrom}
                          shouldDisableDate={date => !minimumDays(date, 2)}
                          variant="dialog"
                          inputVariant="outlined"
                          value={otherDate}
                          onChange={date => handleCalendar(date)}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                </RadioGroup>
              </Box>
              <Box display="flex" justifyContent="center">
                <SuccessButton fullWidth={false} onClick={handleChosenDate}>
                  {t('content.Done')}
                </SuccessButton>
              </Box>
            </DialogContent>
          </Drawer>
        </Slide>
      </Backdrop>
    </MuiPickersUtilsProvider>
  );
};

export default SelectPaymentDatePrompt;
