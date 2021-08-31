# 🏗 Solana App Scaffold
Scaffolding for a dapp built on Solana

# My approach
Before starting this tryout challange I had no prior experience using the Solana scaffold DAPP template and using ant design.

## Wednessday (prepare day): 
- Looked at the example code provided and glanced at the DAPP scaffold

## Thursday:

### What I did:
- Searched for the source code of sollet, Radium and Saber merge tools and inspected it.
- Experimented with the DAPP scaffold to get familiar.
- Implemented a scrambler tool to add auxiliary token accounts for efficient testing.
- Started working on fetching the correct data to determine the 'to be merged accounts'

### Conclusions:
- Encountered some issues trying to use the build-in wallet adapter connector. Took a while to understand how it functions and how to use it.
- When I finally understood it correctly almost an entire day had passed so the sense of not achieving much that day motivated me to continue working through most part of the night.
- After finishing the scrambler tool finally, I started to work on the migration tool. To my surprise this went more smoothly. I had a better knowledge of the scaffold layout after making the scrambler and this really helped me work more efficient.
- I finished late at night with a view that logs the tokens to be merged.

## Friday:

### What I did:
- Got familiar with antd
- Created the interface from the mockups
- Finished the migration tool
- Structured the code 
    
### Conclusions:
- I woke up early with the goal to finish it by Friday evening. This motivated me to keep my focus. I like to set deadlines for myself so I can really set my mind to it. Even tho they are sometimes to ambitious it still pushes myself to work to the best of my abilities.
- I started of restructuring some of the migration tool code. During this I made a state for the grouped token accounts that have to be merged. I spent a while trying to figure out how it fits in the scaffold. I felt like it wasn't right to do it in the view code, so I looked for better solutions. My idea was to create a file in hooks and add code to account context like the other examples there and use it to correctly fetch the state. But after some experiments I was having some trouble trying to figure this out so I eventually moved some code back to the view. I definitely want to restructure the code and make it more clean and less prone to some bugs. But I feel like first I have to look at some scaffold examples and get some more knowledge to figure this out.
- With most of the functionality finished it was time to make a interface with antd, I started using the accordion and card components and it really helped me get the result I desired. I have some experience working with nebular in Angular so I managed to pick it up fairly quickly.

## Reflection:
- I really enjoyed this job-tryout. Altough sometimes it was challenging for me I definitely got a huge urge to push through some problems by working twice as hard. I really appreciate criticism, my goal is to keep improving myself constantly.
- If I would redo this task I would definitely try to get more experience with the scaffold and prepare my code architecture before programming. Also I would like to reach out more and share my decision making.
- Some TODO's that I still would like to do is use more of the existing states from the scaffold in my code and restructure the migrationtool code (like I said in my conclusion above). I also need to implement a price calculator that adds all the token prices and the TOKEN Name's but I haven't really looked into that yet. Finally, I want to make it responsive to the window size. In my opinion I should have definitely done this already especially since this doesn't take much time and it is important to the user experience. 



# TODO
- adjust layout with window size
- code cleaning & restructure
- add Token Name & icon
- add Token market value

# Directory structure

## program

Solana program template in Rust

### program/src/lib.rs
* process_instruction function is used to run all calls issued to the smart contract

## src/actions

Setup here actions that will interact with Solana programs using sendTransaction function

## src/contexts

React context objects that are used propagate state of accounts across the application

## src/hooks

Generic react hooks to interact with token program:
* useUserBalance - query for balance of any user token by mint, returns:
    - balance
    - balanceLamports
    - balanceInUSD
* useUserTotalBalance - aggregates user balance across all token accounts and returns value in USD
    - balanceInUSD
* useAccountByMint
* useTokenName
* useUserAccounts

## src/views

* home - main page for your app
* faucet - airdrops SOL on Testnet and Devnet
# tryout
