# Advent of Code 2020 Day 6: Custom Customs

## URL:

* []() https://adventofcode.com/2020/day/6

## Problem Brief Summary:

* []() Part 1 - Given a collection of strings grouped by a blank line, find the number of unique characters in all lines in each group. Return the sum of the counts.
* []() Part 2 - Given a collection of strings grouped by a blank line, find the intersection of characters in all lines in each group. Return the sum of the counts.


## Problem Solution:

### Part 1 
* []() Split the input by the groups. 
* []() Then for each group, remove the '\r\n' characters and join all the elements into one string per group. 
* []() Itereate through each char in the string and add to a collective Set data structure. 
* []() Repeated characters will not be stored, and we will have the unique characters (Set.size) once the entire string is traversed. That size is the number of yes per group. Record that
* []() Return the sum of all the yes' per group.

### Part 2
* []() Split the input by the groups. Record the number of people per group.
* []() Then for each group, remove the '\r\n' characters and join all the elements into one string per group.
* []() Create a hashtable per group. Iterate through the group string. Record the count of each character in the group string.
* []() Once completed, iterate through the hashtable. If the count of a character is equal to the number of people, then all the people must have said yes to that question (character). Increment counter for allYes in this instance
* []() Return the sum of all the yes' per group.

## Key Files:

` 6/index.js `

## How to Run:

From root directory, run:

` node 6/index.js `

## Contributors:

* []() Anson Varughese
