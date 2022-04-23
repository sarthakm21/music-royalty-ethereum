//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 <0.9.0;
import "@openzeppelin/contracts@4.5.0/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.5.0/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts@4.5.0/access/Ownable.sol";
import "@openzeppelin/contracts@4.5.0/utils/Counters.sol";

// MusicLicense NFT 
contract MusicLicense is ERC721, ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    string private _baseMusicURI;

    constructor(string memory name, string memory baseMusicURI) ERC721(name, "ML") {
        _baseMusicURI = baseMusicURI;
    }

    function _baseURI() internal view override returns (string memory) {
        // TODO: metadata generation
        return _baseMusicURI;
    }

    function safeMint(address to) public {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }
    function buy(uint256 _tokenId) external payable {
        address seller = ownerOf(_tokenId);
        _transfer(seller, msg.sender, _tokenId);

    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}

contract MusicRoyaltyContract {
    uint256 public count = 0; // Count of Songs
    mapping(uint256 => Music) public musicDirectory;
    mapping(address => uint256) public balances; // Store current balances for each artist which can be claimed later
    mapping(string => string[]) public donators; // List of donators
    mapping(address => mapping(uint256 => uint256[])) public buyersToMusicLicenses; // mapping for a buyer's address to the music licenses tokenIds they possess
    
    // So that some ether can be paid initially to cover gas costs.
    constructor() payable {
        // pass
    }
 
    struct Music {
        uint256 _index;
        string _musicName;
        address _nftAddress; // Address of the NFT created
        uint256 _licensesCreated; // No. of licenses(NFTs) generated by artist
        uint256 _licensesBought; // No. of licenses bought by users
        string _artistName;
        address _artist; // Main artist
        address[] _artistAddresses; // All artists including other contributors
        uint256[] _artistCuts; // % royalty cut for each corresponding artist above. total % should be 100;
        string _musicURI;
    }
 
 
    function registerNewMusic (
        string memory musicName,
        string memory artistName,
        address[] memory _artistAddresses,
        uint256[] memory _artistCuts,
        string memory musicURI
        ) public {
            require(_artistAddresses.length == _artistCuts.length, "Artist addresses and cuts don't match");
            uint256 sum = 0;
            for (uint256 i=0; i<_artistCuts.length; i++) {
                require(_artistCuts[i] >= 0, "Percentage cut can't be negative");
                sum += _artistCuts[i];
            }
            require(sum == 100, "Percentage cuts don't add up to 100%");
            musicDirectory[count] = Music(count, musicName, address(0), 0, 0, artistName, msg.sender, _artistAddresses, _artistCuts, musicURI);
            count++;
    }
 
    function generateLicense (
        uint256 index,
        uint256 num
    ) public {
        require(index < count, "Index out of bounds");
        require(msg.sender == musicDirectory[index]._artist, "You don't own this music");
        require(num > 0, "Invalid number of licenses to generate");
        MusicLicense license;
        if (musicDirectory[index]._nftAddress == address(0)){
            MusicLicense musicLicense = new MusicLicense(musicDirectory[index]._musicName, musicDirectory[index]._musicURI);
            musicDirectory[index]._nftAddress = address(musicLicense);
        }
        license = MusicLicense(musicDirectory[index]._nftAddress);
        for(uint256 i = 0 ; i<num; i++){
            license.safeMint(msg.sender);
        }
        musicDirectory[index]._licensesCreated += num;
    }
    // returns the number of licenses available to be bought for a particular music
    function numberOfLicensesLeft(uint256 _index) public view returns(uint256){
        require(_index < count , "Music index not present");
        return musicDirectory[_index]._licensesCreated - musicDirectory[_index]._licensesBought;
    }
    // return licenses tokenIds bought by the caller for a particular music index
    function licensesBought(uint256 _index) public view returns (uint256[] memory) {
        require(_index < count , "Music index not present");
        return buyersToMusicLicenses[msg.sender][_index];
    }
    // A event for user to know about the purchase
    event Purchase(
        address indexed _buyer,
        uint256 _amount
    );
 
      // function for a user to buy a license NFT after paying appropriate royalties(>0.1ETH)
 
   function buyLicense(uint256 index) payable public {
        require(index < count, "Index out of bounds");
        require(msg.value >= 0.1 * 10**18 , "Must send at least 0.1 ETH");
        require(musicDirectory[index]._licensesBought < musicDirectory[index]._licensesCreated, "This music is already at its max amount of licenses bought.");
        // todo: transfer actual NFT
        MusicLicense license = MusicLicense(musicDirectory[index]._nftAddress);
        license.buy(uint256(musicDirectory[index]._licensesBought));
        buyersToMusicLicenses[msg.sender][index].push(musicDirectory[index]._licensesBought);
        musicDirectory[index]._licensesBought += 1;
        // Calculate cuts and update balance.
        for (uint256 i=0; i<musicDirectory[index]._artistCuts.length; i++) {
            balances[musicDirectory[index]._artistAddresses[i]] += musicDirectory[index]._artistCuts[i] * msg.value / 100;
        }
        // Shows the address of buyer and amount
        emit Purchase(msg.sender, msg.value);
   }
    // Allows a user to donate to his favorite artist without any return.
    function donate(uint256 index, string memory Name) public payable {
        require(msg.value > 0, "Donated amount can't be zero or negative");
        require(index < count, "Index out of bounds");
        balances[musicDirectory[index]._artist] += msg.value;
        donators[musicDirectory[index]._artistName].push(Name);
    }
 
    // Allows an artist to claim their royalties
    function claimRoyalties() public {
        require(balances[msg.sender] > 0, "No amount to claim.");
        payable(msg.sender).transfer(balances[msg.sender]);
    }

}
