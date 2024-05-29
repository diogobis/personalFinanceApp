<div align="center">
  <h1>Personal Finance App</h1>
</div>

## Set-up
This project was made using Node 20.13.1

1. Download PocketBase
Download [PocketBase](https://pocketbase.io/docs/) and place pocketbase.exe in a folder for your database. Then go into a folder in the terminal and type:
```sh
./pocketbase serve
```
2. Set-up collections
Enter the Admin UI, create a admin user, go to Settings > Import Collections > Load from JSON file and upload [this file](https://github.com/ligeirin/personalFinanceFrotend/blob/master/pb_schema.json)

3. Clone the repository
```sh
git clone https://github.com/ligeirin/personalFinanceFrotend/
```

4. Install packages
Go to the repository's folder and run:
```sh
npm install
```

5. Run the application
```sh
npm run start
```

6. Access [localhost:4200](localhost:4200) to open the application