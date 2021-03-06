LIBRARY IEEE;
USE IEEE.STD_LOGIC_1164.ALL;
USE IEEE.STD_LOGIC_UNSIGNED.ALL;

ENTITY DIVIZORAN IS
	PORT ( CLK: IN STD_LOGIC;
			TEMPO: OUT STD_LOGIC_VECTOR( 1 DOWNTO 0));
END ENTITY;

ARCHITECTURE ARCH_DIVIZORAN OF DIVIZORAN IS
SIGNAL COUNTER_COMUT: INTEGER RANGE 0 TO 250000:=0;
SIGNAL TEMPORAR: STD_LOGIC_VECTOR(1 DOWNTO 0):="00";
BEGIN
PROCESS(CLK)
BEGIN
	IF RISING_EDGE(CLK) THEN 
		IF COUNTER_COMUT=249999 THEN 
			COUNTER_COMUT<=0;
			TEMPORAR<=TEMPORAR+'1';
		ELSE COUNTER_COMUT<=COUNTER_COMUT+1;
		END IF;
	END IF;
END PROCESS;
TEMPO<=TEMPORAR;
END ARCHITECTURE;