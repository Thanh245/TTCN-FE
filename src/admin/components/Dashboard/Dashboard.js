import * as React from "react";
import { Card, CardContent, CardHeader } from '@material-ui/core';
import {
    useState,
    useEffect,
    useCallback,
    FC,
    CSSProperties,
} from 'react';
import { useVersion, useDataProvider } from 'react-admin';
import { useMediaQuery, Theme } from '@material-ui/core';
import { subDays } from 'date-fns';

import Welcome from './Welcome';


export const Dashboard =  () =>{

    return (
        <Card>
            <Welcome />
            <CardHeader title="Admin Panel" />
            <CardContent>Demo Version 1.0</CardContent>
        </Card>
    );

} 