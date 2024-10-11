"use client"

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

interface SensorReading {
  temperature: number;
  humidity: number;
  timestamp: string;
}

interface SensorDataProps {
  data: SensorReading[];
  onNewData: (data: SensorReading) => void;
}

export default function SensorData({ data = [], onNewData }: SensorDataProps) {
  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSimulating) {
      interval = setInterval(async () => {
        try {
          const response = await axios.get<SensorReading>('/api/sensor-data');
          onNewData(response.data);
        } catch (error) {
          console.error('Error fetching sensor data:', error);
        }
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isSimulating, onNewData]);

  const toggleSimulation = () => {
    setIsSimulating(!isSimulating);
  };

  return (
    <div>
      <Button onClick={toggleSimulation}>
        {isSimulating ? 'Stop Simulation' : 'Start Simulation'}
      </Button>
      <div className="mt-4 h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="temperature" stroke="#8884d8" />
            <Line yAxisId="right" type="monotone" dataKey="humidity" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}